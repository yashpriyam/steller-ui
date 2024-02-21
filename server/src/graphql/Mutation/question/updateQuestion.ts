import { questionModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
import {
  checkIsTopicExist,
  generateNestedUpdate,
  removeNullAndUndefinedKeys,
} from "@utils";
export const updateQuestionById = async (
  _parent: undefined,
  args: { updateQuestionData: UpdateQuestionInputType }
): Promise<UpdateQuestionOutputType | undefined> => {
  const { QUESTION_UPDATION_SUCCESS } = localMessages.QUESTION_MODEL;
  const { QUESTION_UPDATION_FAILED } = errorMessages.QUESTION_MODEL;
  const { INVALID_TOPIC_AND_SUBTOPIC } = errorMessages.TOPIC;
  const errorData: CustomResponseType = {
    message: QUESTION_UPDATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { updateQuestionData } = args;
    const { updates, questionId } = updateQuestionData;
    const { meta, questionSubTopics } = updates;
    const { topic, } = meta;
    const isTopicExist = await checkIsTopicExist({
      topic:topic??"",
      subTopics: questionSubTopics ?? [],
    });
    if (!isTopicExist) {
      return {
        response: {
          message: INVALID_TOPIC_AND_SUBTOPIC,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
    const updatedFields = generateNestedUpdate(
      removeNullAndUndefinedKeys(updates)
    );

    const questionUpdatedData: QuestionDataType | null =
      await questionModel.findByIdAndUpdate(
        questionId,
        {
          $set: updatedFields,
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
