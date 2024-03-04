import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql`
  query GetAllTags($filter: TagsSchemaInput) {
    getAllTags(filter: $filter) {
      tagData
      response {
        status
        message
      }
    }
  }
`;
