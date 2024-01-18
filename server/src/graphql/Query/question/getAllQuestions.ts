import { localMessages, errorMessages, statusCodes } from "@constants";
import { questionAttempt, questionModel } from "@models";
import { isLoggedIn } from "@utils";
import mongoose from "mongoose";

export const getAllQuestions = async (
  _parent: undefined,
  args: { filterData: filterDataType; pagination: pagination },
  { contextData }: ContextType
): Promise<QuestionsReturnType | unknown> => {
  const { QUESTION_FOUND_SUCCESS } = localMessages.QUESTION_MODEL;
  const { QUESTION_NOT_FOUND } = errorMessages.QUESTION_MODEL;
  const { UNAUTHORIZED_USER } = errorMessages.MSG;
  if (!isLoggedIn(contextData)) {
    return {
      response: {
        status: statusCodes.UNAUTHORIZED_USER,
        message: UNAUTHORIZED_USER,
      },
    };
  }
  const userData = contextData.user;
  const errorData: CustomResponseType = {
    message: QUESTION_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { filterData, pagination } = args;
    const { limit, skip } = pagination;
    const filteredData: Record<string, string | number | boolean> = filterData;
    const updatedFields: Record<string, string | number | boolean> = {};
    for (const key in filteredData) {
      if (filteredData.hasOwnProperty(key)) {
        const fullPath = `meta.${key}`;
        updatedFields[fullPath] = filteredData[key];
      }
    }
    const questionList: [QuestionSchemaType] = await questionModel
      .find(updatedFields)
      .skip(skip)
      .limit(limit)
      .lean();
    const questionIdList = questionList.map((question) => question._id);
    const questionAttemptList: AllAttemptedQuestionDataType[] =
      await questionAttempt.find({
        userId: new mongoose.Types.ObjectId(userData._id),
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
      const updatedQuestionData = { ...questionData, isAnswered: false };
      const attemptData = questionAttemptIdMap[questionData._id.toString()];
      if (attemptData) {
        if (attemptData.isCorrect) {
          totalCorrectQuestions += 1;
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
