import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
  query GetAllQuestions($filterData: GetQuestionsFilterInput) {
    getAllQuestions(filterData: $filterData) {
      questionData {
        question {
          text
          imageUrl
        }
        batchCode
        options {
          text
          imageUrl
        }
        questionType
        answer {
          text
          imageUrl
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
