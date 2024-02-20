import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($questionData: CreateQuestionInputType!) {
    createQuestion(questionData: $questionData) {
      questionData {
        marks
        answer {
          text
          imageUrl
          iframe
          codeBlock {
            enableCodeBlock
            configuration {
              showSplitWindow
              showOutputWindow
              openWindows {
                title
                predefinedCode
                isEditable
                enableUserSelection
              }
            }
          }
        }
        title {
          text
          imageUrl
          iframe
          codeBlock {
            configuration {
              showSplitWindow
              openWindows {
                enableUserSelection
                isEditable
                predefinedCode
                title
              }
              showOutputWindow
            }
            enableCodeBlock
          }
        }
        options {
          text
          imageUrl
          iframe
          codeBlock {
            enableCodeBlock
            configuration {
              showSplitWindow
              showOutputWindow
              openWindows {
                enableUserSelection
                predefinedCode
                isEditable
                title
              }
            }
          }
        }
        questionType
        questionTypeTags
        meta {
          batchCode
          day
          expiresInMins
          isActive
          isArchived
          isOpenable
          topic
          type
          week
        }
      }
      response {
        message
        status
      }
    }
  }
`;
