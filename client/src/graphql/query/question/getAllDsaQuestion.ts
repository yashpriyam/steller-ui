import { gql } from "@apollo/client";

export const GET_ALL_DSA_QUESTIONS = gql`
  query GetAllDsaQuestions($filterData: FilterData, $pagination: Pagination) {
    getAllDsaQuestions(filterData: $filterData, pagination: $pagination) {
      questionData {
        questionId
        attemptResponse {
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
        description {
          value
          type
        }
        title {
          text
          redirectLink
          iframe
          imageUrl
          codeBlock {
            enableCodeBlock
            configuration {
              showOutputWindow
              showSplitWindow
              openWindows {
                title
                isEditable
                enableUserSelection
                predefinedCode
              }
            }
          }
        }
        meta {
          topic
          day
          week
          batchCode
          isActive
          isArchived
          type
          expiresInMins
          isOpenable
        }
        questionSubTopics {
          title
        }
        questionType
        questionTypeTags
      }
      response {
        status
        message
      }
    }
  }
`;
