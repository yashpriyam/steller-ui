import { questionAttempt, questionModel } from '@models';
import { localMessages, errorMessages, statusCodes } from '@constants';
import isCorrectAnswer from './utils/isCorrectAnswer';


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
    const { questionId, userId, response } = questionAttemptData;
    const question = await questionModel.findById(questionId);

    const isCorrect = isCorrectAnswer(response, question!.answer);

    const createdQuestionAttemtData: QuestionAttemptSchemaType =
      await questionAttempt.create({
        isCorrect,
        questionId,
        userId,
        response,
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
