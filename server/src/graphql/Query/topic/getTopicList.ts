import { topicModel } from "@models";
import { localMessages, errorMessages,statusCodes } from "@constants";

export const getTopicList = async ():Promise<GetTopicOutputType> => {
    const { TOPIC_LIST_READ_SUCCESS } = localMessages.TOPIC;
    const { TOPIC_READ_FAILED,TOPIC_LIST_IS_EMPTY } = errorMessages.TOPIC;
  try {
    const topicsData = await topicModel.find();
    if (topicsData?.length) {
      const topicsList = topicsData.map((topic) => topic.topic);
      
      return {
        topicList: topicsList,
        response: {
          message: TOPIC_LIST_READ_SUCCESS,
          status: statusCodes.OK,
        },
      };
    }

    return {
      response: {
        message: TOPIC_LIST_IS_EMPTY,
        status:statusCodes.OK
      },
    };
  } catch (err) {
    return {
      response: {
        message: TOPIC_READ_FAILED,
        status: statusCodes.BAD_REQUEST,
      },
    };
  }
};
