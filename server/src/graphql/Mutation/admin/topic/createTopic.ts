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
    // Extracting user information from context
    const { user } = contextData;
    const { email } = user;
    // Checking if the user is an admin
    const isAdminUser = await isAdmin(email);
    if (!isAdminUser) {
      // Return unauthorized response if user is not an admin
      return {
        response: {
          message: USER_IS_NOT_ADMIN,
          status: statusCodes.UNAUTHORIZED,
        },
      };
    }
    // Extracting topic data from arguments
    const { topicData } = args;
    const { subTopics, topic } = topicData;
    // Checking if the topic already exists
    const isTopicExist = await topicModel.exists({ topic });
    if (isTopicExist) {
      // Return error response if the topic already exists
      return {
        response: {
          message: TOPIC_DUPLICACY,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
    // Creating the new topic
    const topicResponse: TopicSchemaType = await topicModel.create({
      topic,
      subTopics,
    });
    // Returning success response with created topic data
    return {
      topicData: topicResponse,
      response: {
        status: statusCodes.OK,
        message: CREATION_SUCCESS,
      },
    };
  } catch (error) {
    return {
      // Handling errors and returning error response
      response: {
        message: CREATION_FAILED,
        status: statusCodes.BAD_REQUEST,
      },
    };
  }
};
