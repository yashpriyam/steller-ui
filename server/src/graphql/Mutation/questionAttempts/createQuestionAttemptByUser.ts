import { questionAttempt, questionModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { isCorrectAnswer, getCheckedOptions, isLoggedIn, getUnauthorizedResponse } from "@utils";
export const createQuestionAttemptByUser = async (
  _parent: undefined,
  args: { questionAttemptData: QuestionAttemptSchemaType },
  { contextData }: ContextType
): Promise<any | unknown> => {
  const { QUESTION_ATTEMPT_SUCCESS } = localMessages.QUESTION_ATTEMPT_MODEL;
  const { QUESTION_ATTEMPT_FAILED } = errorMessages.QUESTION_ATTEMPT_MODEL;

  if (!isLoggedIn(contextData)) {
   return getUnauthorizedResponse();
  }
  const userData = contextData.user;
  const userId = userData._id;

  const errorData: CustomResponseType = {
    message: QUESTION_ATTEMPT_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { questionAttemptData } = args;
    const { questionId, response } = questionAttemptData;
    const question = await questionModel.findById(questionId);
    const isCorrect = isCorrectAnswer(response, question!.answer);
    const updatedResponse = getCheckedOptions(response, question?.options);
    const existingQuestionAttempt = await questionAttempt.findOne({
      questionId,
      userId,
      isLatest: true
    });
    if (existingQuestionAttempt) {
      existingQuestionAttempt.isLatest = false;
      await existingQuestionAttempt.save();
    }
    const createdQuestionAttemtData: QuestionAttemptSchemaType =
      await questionAttempt.create({
        isCorrect,
        questionId,
        userId,
        response: updatedResponse,
        isLatest: true,
      });
    const responseData: CustomResponseType = createdQuestionAttemtData
      ? {
          message: QUESTION_ATTEMPT_SUCCESS,
          status: statusCodes.CREATED,
        }
      : errorData;

    return {
      questionData: createdQuestionAttemtData,
      response: responseData,
    };
  } catch (error) {
    return { response: errorData };
  }
};
