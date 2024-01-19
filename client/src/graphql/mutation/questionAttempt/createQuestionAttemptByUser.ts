import { gql } from "@apollo/client";

export const CREATE_QUESTION_ATTEMPT_BY_USER = gql`
  mutation CreateQuestionAttemptByUser(
    $questionAttemptData: QuestionAttemptType!
  ) {
    createQuestionAttemptByUser(questionAttemptData: $questionAttemptData) {
      questionData {
        userId
        questionId
        isCorrect
        response {
          iframe
          imageUrl
          isChecked
          text
        }
      }
      response {
        status
        message
      }
    }
  }
`;
