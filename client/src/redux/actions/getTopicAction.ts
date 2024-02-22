import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { GET_SUB_TOPICS } from "../../graphql/query/topic/subTopic";
import { GET_TOPIC_LIST } from "../../graphql/query/topic/topic";

export const getTopicList = async () => {
  try {
    const response = await apolloClient.query({
      query: GET_TOPIC_LIST,
      variables: {},
    });
    return response.data.getTopicList;
  } catch (error) {
    console.log(error);
  }
};

export const getSubTopicList = async (topic: string) => {
  try {
    const response = await apolloClient.query({
      query: GET_SUB_TOPICS,
      variables: {
        topic: topic,
      },
    });
    return response?.data?.getSubTopicList;
  } catch (error) {
    console.log(error);
  }
};
