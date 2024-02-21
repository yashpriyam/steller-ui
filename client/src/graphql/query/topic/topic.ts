import { gql } from "@apollo/client";

export const GET_TOPIC_LIST = gql`
  query GetTopicList {
    getTopicList {
      topicList
      response {
        message
        status
      }
    }
  }
`;