import { gql } from "@apollo/client";

export const GET_ALL_QUESTIONS = gql`
  query GetAllQuestions($filterData: GetQuestionsFilterInput) {
    getAllQuestions(filterData: $filterData) {
      response {
        status
        message
      }
      questionData {
        questionType
        question {
          imageUrl
          text
        }
        options {
          imageUrl
          text
        }
        meta {
          topic
          day
          isActive
          isArchived
          type
          expiresInMins
          isOpenable
        }
        marks
        batchCode
        answer {
          imageUrl
          text
        }
        id
      }
    }
  }
`;
