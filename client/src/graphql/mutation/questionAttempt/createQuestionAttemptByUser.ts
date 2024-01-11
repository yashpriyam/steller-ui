import { gql } from "@apollo/client";

export const CREATE_QUESTION_ATTEMPT_BY_USER = gql`
  mutation CreateQuestionAttemptByUser(
    $questionAttemptData: QuestionAttemptType!
  ) {
    createQuestionAttemptByUser(questionAttemptData: $questionAttemptData) {
      questionData {
        userId
        questionId
        response {
          imageUrl
          text
        }
        isCorrect
        timestamp
      }
      response {
        status
        message
      }
    }
  }
`;
