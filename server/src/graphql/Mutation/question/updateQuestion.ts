import { questionModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { removeNullAndUndefinedKeys } from "@utils";
export const updateQuestionById = async (
  _parent: undefined,
  args: { updateQuestionData: UpdateQuestionInputType }
): Promise<UpdateQuestionOutputType | undefined> => {
  const { QUESTION_UPDATION_SUCCESS } = localMessages.QUESTION_MODEL;
  const { QUESTION_UPDATION_FAILED } = errorMessages.QUESTION_MODEL;
  const errorData: CustomResponseType = {
    message: QUESTION_UPDATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { updateQuestionData } = args;
    const { updates, questionId } = updateQuestionData;
    const updatedData = removeNullAndUndefinedKeys(updates);
    const { answer, batchCode, marks, options, question, questionType, meta } =updatedData
    const questionUpdatedData: QuestionDataType | null =
      await questionModel.findByIdAndUpdate(
        questionId,
        {
          answer,
          batchCode,
          marks,
          options,
          question,
          questionType,
          $set: {"meta.$": meta },
        },
        { new: true }
      );
    if (!questionUpdatedData) {
      const errorData: CustomResponseType = {
        message: QUESTION_UPDATION_FAILED,
        status: statusCodes.BAD_REQUEST,
      };
      return {
        response: errorData,
      };
    }
    return {
      questionData: questionUpdatedData,
      response: {
        message: QUESTION_UPDATION_SUCCESS,
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return {
      response: errorData,
    };
  }
};
