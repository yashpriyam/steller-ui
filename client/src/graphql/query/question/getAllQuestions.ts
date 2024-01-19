import { gql } from "@apollo/client";

export const GET_ALL_QUESTIONS = gql`
  query GetAllQuestions($pagination: Pagination, $filterData: FilterData) {
    getAllQuestions(pagination: $pagination, filterData: $filterData) {
      totalUnAttemptedQuestions
      totalQuestions
      totalInCorrectQuestions
      totalCorrectQuestions
      response {
        status
        message
      }
      questions {
        _id
        isAnswered
        isCorrect
        meta {
          batchCode
          day
          expiresInMins
          isArchived
          isActive
          isOpenable
          topic
          type
          week
        }
        answer {
          iframe
          imageUrl
          text
        }
        marks
        options {
          iframe
          imageUrl
          isChecked
          text
        }
        questionType
        title {
          text
          imageUrl
          iframe
        }
      }
    }
  }
`;
