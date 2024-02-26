import { localMessages, errorMessages, statusCodes } from "@constants";
import { User, questionAttempt, questionModel } from "@models";
import {
  isLoggedIn,
  getUnauthorizedResponse,
  checkPaidUser, QuestionTypeObject,
  isAdmin,
} from "@utils";
import mongoose from "mongoose";

const { QUESTION_FOUND_SUCCESS } = localMessages.QUESTION_MODEL;
const { QUESTION_NOT_FOUND } = errorMessages.QUESTION_MODEL;
const { WEEK_NOT_FOUND } = errorMessages.WEEK_MODEL;

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
    let { filterData, pagination } = args;
    const { limit, skip } = pagination;
    const userInfo = await User.findById(userId); //Fetch user info
    const userSelectedFeePlan = userInfo?.feePlan;
    // Check if user is paid
    const isPaidUser = await checkPaidUser(
      userId ?? "",
      userSelectedFeePlan ?? ""
    );
    const email = userInfo?.email;
    // Check if user is admin
    const isAdminUser = await isAdmin(email ?? "");
    // Fetch access weeks for paid users
    const { accessWeeks } = isPaidUser || {};
    // Check if user is not admin and week is specified but not accessible
    if (
      !isAdminUser &&
      filterData.week &&
      !accessWeeks?.includes(filterData?.week)
    ) {
      return {
        response: {
          message: WEEK_NOT_FOUND,
          status: statusCodes.OK,
        },
      };
    }
    // Check if user is not admin and week is specified but not accessible, remove week from filterData
    if (!isAdminUser && !accessWeeks?.includes(filterData?.week)) {
      const { week, ...filteredFilterData } = filterData;
      filterData = filteredFilterData;
    }
    const filteredData: Record<string, string | number | boolean> = filterData;
    const updatedFields: Record<string, string | number | boolean | object> =
      {};

    // Exclude 'dsa' from the query
    updatedFields["questionType"] = { $ne: QuestionTypeObject.dsa };
    
    // Prepare updatedFields for querying
    for (const key in filteredData) {
      if (filteredData.hasOwnProperty(key)) {
        const fullPath = `meta.${key}`;
        updatedFields[fullPath] = filteredData[key];
      }
    }
    // If user is not admin and week is not specified, include accessWeeks in meta.week to handle user can get all there accessible question list
    if (!isAdminUser && !Boolean(filterData.week)) {
      updatedFields[`meta.week`] = { $in: accessWeeks };
    }
    
    const [totalQuestionCount, questionList] = await Promise.all([
      questionModel.countDocuments(updatedFields),
      questionModel.find(updatedFields).skip(skip).limit(limit).lean(),
    ]);
    
    // Fetch question attempts for the user
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
        Single: questionType === QuestionTypeObject.single,
        Multi: questionType === QuestionTypeObject.multi,
        Codeblock: questionType === QuestionTypeObject.codeblock,
      };
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
        if (
          attemptData.isCorrect &&
          (questionTypes.Single || questionTypes.Multi)
        ) {
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
      totalQuestions: totalQuestionCount,
      totalCorrectQuestions,
      totalInCorrectQuestions,
      totalUnAttemptedQuestions,
      response,
    };
  } catch (error) {
    return { response: errorData };
  }
};
