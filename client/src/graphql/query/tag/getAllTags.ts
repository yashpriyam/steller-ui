import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql`
  query GetAllTags($filter: TagsSchemaInput) {
    getAllTags(filter: $filter) {
      tagData {
        tagName
        tagKey
        tagType
        childrenTags {
          title
          tagType
          tagKey
          parentTagKey
          parentTagType
        }
      }
      response {
        status
        message
      }
    }
  }
`;
