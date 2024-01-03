import { questionAttempt } from '@models';
import { localMessages, errorMessages, statusCodes } from '@constants';
export const createQuestionAttemptByUser = async (
  _parent: undefined,
  args: { questionAttemptData: QuestionAttemptSchemaType }
): Promise<any | unknown> => {
  const { QUESTION_ATTEMPT_SUCCESS } = localMessages.QUESTION_ATTEMPT_MODEL;
  const { QUESTION_ATTEMPT_FAILED } = errorMessages.QUESTION_ATTEMPT_MODEL;
  const errorData: CustomResponseType = {
    message: QUESTION_ATTEMPT_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { questionAttemptData } = args;  
    const { isCorrect, questionId, userId,response } = questionAttemptData;
    const createdQuestionAttemtData: QuestionAttemptSchemaType =
      await questionAttempt.create({
        isCorrect,
        questionId,
        userId,
        response
      });      
    const responseData: CustomResponseType = createdQuestionAttemtData
      ? {
          message: QUESTION_ATTEMPT_SUCCESS,
          status: statusCodes.CREATED,
        }
      : errorData;

    return {
      questionData: createdQuestionAttemtData,
      response:responseData,
    };
  } catch (error) {
    return { response :errorData};
  }
};
