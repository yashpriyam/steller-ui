import { gql } from '@apollo/client';

export const GET_USER_CODE = gql`
  query GetUserCode($input: getUserCodeInputType) {
    getUserCode(input: $input) {
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
