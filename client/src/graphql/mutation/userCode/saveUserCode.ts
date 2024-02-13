import { gql } from "@apollo/client";

export const SAVE_USER_CODE = gql`
  mutation SaveUserCode($input: SaveUserCodeInput) {
    saveUserCode(input: $input) {
      data {
        questionId
        weekNumber
        dayNumber
        code {
          html
          css
          js
        }
        updatedAt
      }
      response {
        status
        message
      }
    }
  }
`;
