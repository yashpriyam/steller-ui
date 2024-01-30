import { gql } from '@apollo/client';

export const GET_USER_CODE = gql`
  query GetUserCode {
    getUserCode {
      data {
        userId
        questionId
        weekNumber
        dayNumber
        code {
          html
          css
          js
        }
      }
      response {
        message
        status
      }
    }
  }
`;
