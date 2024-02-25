import { gql } from "@apollo/client";



export const DSA_QUESTION_ATTEMPT = gql`
  mutation DsaQuestionAttempt(
    $questionAttemptData: DsaQuestionAttemptInputType!
  ) {
    dsaQuestionAttempt(questionData: $questionAttemptData) {
      response {
        status
        message
      }
      dsaResponseData {
        questionId
        dsaResponse {
          submissionLink
          questionSubmissionStatus
          testCases {
            totalTestCases
            passedTestCases
          }
        }
      }
    }
  }
`;