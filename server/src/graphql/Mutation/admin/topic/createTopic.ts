import { statusCodes, errorMessages, localMessages } from "@constants";
import { isAdmin } from "@utils";
import { topicModel } from "@models";

export const createTopic = async (
  _parent: undefined,
  args: { topicData: TopicSchemaType },
  { contextData }: ContextType
): Promise<unknown> => {
  const { CREATION_SUCCESS } = localMessages.TOPIC;
  const { USER_IS_NOT_ADMIN } = errorMessages.USER;
  const { CREATION_FAILED, TOPIC_DUPLICACY } = errorMessages.TOPIC;
  try {
    const { user } = contextData;
    const { email } = user;
    const isAdminUser = await isAdmin(email);
    if (!isAdminUser) {
      return {
        response: {
          message: USER_IS_NOT_ADMIN,
          status: statusCodes.UNAUTHORIZED,
        },
      };
    }
    const { topicData } = args;
    const { subTopics, topic } = topicData; 
    const isTopicExist = await topicModel.exists({ topic });
    if (isTopicExist) {
      return {
        response: {
          message: TOPIC_DUPLICACY,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
    const topicResponse: TopicSchemaType = await topicModel.create({
      topic,
      subTopics,
    });
    return {
      topicData: topicResponse,
      response: {
        status: statusCodes.OK,
        message: CREATION_SUCCESS,
      },
    };
  } catch (error) {
    return {
      response: {
        message: CREATION_FAILED,
        status: statusCodes.BAD_REQUEST,
      },
    };
  }
};
