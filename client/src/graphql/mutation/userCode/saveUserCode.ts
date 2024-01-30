import { gql } from "@apollo/client";

export const SAVE_USER_CODE = gql`
  mutation SaveUserCode($input: SaveUserCodeInput) {
    saveUserCode(input: $input) {
      questionId
      weekNumber
      dayNumber
      code {
        html
        css
        js
      }
      response {
        status
        message
      }
    }
  }
`;
