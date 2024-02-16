import { localMessages, errorMessages, statusCodes } from "@constants";
import { User, questionAttempt, questionModel } from "@models";
import { isLoggedIn, getUnauthorizedResponse, checkPaidUser, QuestionTypeObject } from "@utils";
import mongoose from "mongoose";

const { QUESTION_FOUND_SUCCESS } = localMessages.QUESTION_MODEL;
const { QUESTION_NOT_FOUND } = errorMessages.QUESTION_MODEL;

export const getAllQuestions = async (
  _parent: undefined,
  args: { filterData: filterDataType; pagination: pagination },
  { contextData }: ContextType
): Promise<QuestionsReturnType | unknown> => {
  if (!isLoggedIn(contextData)) {
    return getUnauthorizedResponse();
  }
  const userId = contextData.user._id;
  const errorData: CustomResponseType = {
    message: QUESTION_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { filterData, pagination } = args;
    const { limit, skip } = pagination;
    const userInfo = await User.findById(userId);
    const userSelectedFeePlan = userInfo?.feePlan;
    const isPaidUser = await checkPaidUser(
      userId ?? "",
      userSelectedFeePlan ?? ""
    );
    const { accessWeeks } = isPaidUser || {};
    if (!accessWeeks?.includes(filterData?.week)) {
      delete filterData.week;
    }
    const filteredData: Record<string, string | number | boolean> = filterData;
    const updatedFields: Record<string, string | number | boolean | object> = {};
    for (const key in filteredData) {
      if (filteredData.hasOwnProperty(key)) {
        const fullPath = `meta.${key}`;
        updatedFields[fullPath] = filteredData[key];
      }
    }
    if (!Boolean(filterData.week)) {
      updatedFields[`meta.week`] = { $in: accessWeeks };
    }
    const questionList: [QuestionSchemaType] = await questionModel
      .find(updatedFields)
      .skip(skip)
      .limit(limit)
      .lean();
    const questionIdList = questionList.map((question) => question._id);
    const questionAttemptList: AllAttemptedQuestionDataType[] =
      await questionAttempt.find({
        userId: new mongoose.Types.ObjectId(userId),
        questionId: { $in: questionIdList },
        isLatest: true,
      });
    const questionAttemptIdMap: QuestionAttemptIdMapType = {};
    questionAttemptList.map((questionAttemptData) => {
      questionAttemptIdMap[questionAttemptData.questionId.toString()] =
        questionAttemptData;
    });
    let totalCorrectQuestions = 0;
    const updatedQuestionList = questionList.map((questionData) => {
      const { questionType } = questionData || {};
      const questionTypes = {
        Single: questionType===QuestionTypeObject.single,
        Multi: questionType===QuestionTypeObject.multi,
        Fillup: questionType===QuestionTypeObject.fillup,
        Codeblock: questionType===QuestionTypeObject.codeblock,
      }
      if (questionTypes.Codeblock) {
        return questionData;
      }
      const updatedQuestionData = {
        ...questionData,
        isAnswered: false,
        isCorrect: false,
      };
      const attemptData = questionAttemptIdMap[questionData._id.toString()];
      if (attemptData) {
        if (attemptData.isCorrect && (questionTypes.Single || questionTypes.Multi)) {
          totalCorrectQuestions += 1;
          updatedQuestionData.isCorrect = true;
        }
        updatedQuestionData.isAnswered = true;
        updatedQuestionData.options = attemptData.response;
      }
      return updatedQuestionData;
    });
    const response: CustomResponseType = questionList.length
      ? {
          message: QUESTION_FOUND_SUCCESS,
          status: statusCodes.OK,
        }
      : errorData;
    const totalUnAttemptedQuestions =
      questionList.length - questionAttemptList.length;
    const totalInCorrectQuestions = questionList.length - totalCorrectQuestions;
    return {
      questions: updatedQuestionList,
      totalQuestions: questionList.length,
      totalCorrectQuestions,
      totalInCorrectQuestions,
      totalUnAttemptedQuestions,
      response,
    };
  } catch (error) {
    return { response: errorData };
  }
};
