import { gql } from "@apollo/client";

export const GET_ALL_QUESTIONS = gql`
  query GetAllQuestions($filterData: GetQuestionsFilterInput) {
    getAllQuestions(filterData: $filterData) {
      questionData {
        id
        title {
          text
          imageUrl
          iframe
        }
        batchCode
        options {
          text
          imageUrl
          iframe
        }
        questionType
        answer {
          text
          imageUrl
          iframe
        }
        marks
        meta {
          topic
          day
          isActive
          isArchived
          type
          expiresInMins
          isOpenable
        }
      }
      response {
        status
        message
      }
    }
  }
`;
