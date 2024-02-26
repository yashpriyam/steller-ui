import { gql } from "@apollo/client";

export const GET_SUB_TOPICS = gql`
  query GetSubTopicList($topic: String!) {
    getSubTopicList(topic: $topic) {
      subTopicList {
        title
      }
      response {
        status
        message
      }
    }
  }
`;