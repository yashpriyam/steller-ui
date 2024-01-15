import { gql } from "@apollo/client";

export const GET_ALL_QUESTIONS = gql`
  query GetAllQuestions($filterData: GetQuestionsFilterInput) {
    getAllQuestions(filterData: $filterData) {
      nonAttemptedQuestions {
        id
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
        title {
          text
          imageUrl
          iframe
        }
      }
      attemptedQuestions {
        userId
        questionId {
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
            isChecked
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
          text
          imageUrl
          iframe
        }
        isCorrect
        timestamp
      }
      response {
        status
        message
      }
      totalAttemptedQuestions
      totalNonAttemptedQuestions
      totalQuestions
    }
  }
`;
