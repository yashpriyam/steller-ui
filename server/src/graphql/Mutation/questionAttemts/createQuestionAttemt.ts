import { QuestionAttempt } from '@models';
import { localMessages, errorMessages, statusCodes } from '@constants';
export const createQuestionAttemtByUser = async (
  _parent: undefined,
  args: { questionAttemtData: QuestionAttemptSchemaType }
): Promise<any | unknown> => {
  const { QUESTION_ATTEMT_SUCCESS } = localMessages.QUESTION_ATTEMT_MODEL;
  const { QUESTION_ATTEMT_FAILED } = errorMessages.QUESTION_ATTEMT_MODEL;
  const errorData: CustomResponseType = {
    message: QUESTION_ATTEMT_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { questionAttemtData } = args;  
    const { isCorrect, questionId, userId,response } = questionAttemtData;
    const createdQuestionAttemtData: QuestionAttemptSchemaType =
      await QuestionAttempt.create({
        isCorrect,
        questionId,
        userId,
        response
      });      
    const responseData: CustomResponseType = createdQuestionAttemtData
      ? {
          message: QUESTION_ATTEMT_SUCCESS,
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
