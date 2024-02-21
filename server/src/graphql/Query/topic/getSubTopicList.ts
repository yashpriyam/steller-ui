import { topicModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
export const getSubTopicList = async (
  _parent: undefined,
  args: { topic: string }
) => {
  const { TOPIC_LIST_READ_SUCCESS } = localMessages.TOPIC;
  const { TOPIC_READ_FAILED, TOPIC_LIST_IS_EMPTY } = errorMessages.TOPIC;
  try {
    const { topic } = args;
    const subTopicList = await topicModel.findOne({ topic }, { subTopics: 1 });
    const subTopics = subTopicList?.subTopics;
    if (subTopics?.length) {
      return {
        subTopicList: subTopics,
        response: {
          message: TOPIC_LIST_READ_SUCCESS,
          status: statusCodes.OK,
        },
      };
    }
    return {
      response: {
        message: TOPIC_LIST_IS_EMPTY,
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return {
      response: {
        message: TOPIC_READ_FAILED,
        status: statusCodes.BAD_REQUEST,
      },
    };
  }
};
