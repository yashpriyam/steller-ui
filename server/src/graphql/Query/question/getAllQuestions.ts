import { localMessages, errorMessages, statusCodes } from "@constants";
import { questionAttempt, questionModel } from "@models";
import { removeNullAndUndefinedKeys } from "@utils";
import mongoose from "mongoose";

export const getAllQuestions = async (
  _parent: undefined,
  args: { filterData: filterInputType },
  { contextData }: ContextType
): Promise<QuestionsReturnType | unknown> => {
  const { QUESTION_FOUND_SUCCESS } = localMessages.QUESTION_MODEL;
  const { QUESTION_NOT_FOUND } = errorMessages.QUESTION_MODEL;
  const { UNAUTHORIZED_USER } = errorMessages.MSG;
  if (!contextData || !contextData.user) {
    return ({
      response: {
        status: statusCodes.UNAUTHORIZED_USER,
        message: UNAUTHORIZED_USER,
      }
    });
  }
  const userData = contextData.user;
  const errorData: CustomResponseType = {
    message: QUESTION_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { filterData } = args;
    const filteredData = removeNullAndUndefinedKeys(filterData);
    const updatedFields: Record<string, string> = {};
    for (const key in filteredData) {
      const fullPath = `meta.${key}`;
      updatedFields[fullPath] = filteredData[key];
    }
    const questionAttemptList: AllAttemptedQuestionDataType[] =
      await questionAttempt
        .find({
          userId: new mongoose.Types.ObjectId(userData._id),
        })
        .populate("questionId");
    const attemptedQuestionIds: string[] = [];
    questionAttemptList.forEach((questionAttemptData) => {
      attemptedQuestionIds.push(questionAttemptData?.questionId?._id);
      questionAttemptData.response.forEach((responseData) => {
        questionAttemptData.questionId.options.forEach((optionData) => {
          optionData.isChecked = !!(
            (optionData.text && responseData.text === optionData.text) ||
            (optionData.imageUrl &&
              responseData.imageUrl === optionData.imageUrl)
          );
        });
      });
    });
    const nonAttemptedQuestionList: QuestionSchemaType[] =
      await questionModel.find({
        _id: {
          $nin: attemptedQuestionIds,
        },
      });
    const response: CustomResponseType = nonAttemptedQuestionList.length
      ? {
          message: QUESTION_FOUND_SUCCESS,
          status: statusCodes.OK,
        }
      : errorData;
    return {
      attemptedQuestions: questionAttemptList,
      nonAttemptedQuestions: nonAttemptedQuestionList,
      totalAttemptedQuestions: questionAttemptList.length,
      totalNonAttemptedQuestions: nonAttemptedQuestionList.length,
      totalQuestions:
        questionAttemptList.length + nonAttemptedQuestionList.length,
      response,
    };
  } catch (error) {
    return { response: errorData };
  }
};
