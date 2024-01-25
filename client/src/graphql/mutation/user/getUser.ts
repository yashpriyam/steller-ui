import { gql } from "@apollo/client";

export const GET_USER = gql`
query {
    getUser {
      userData {
        email
        name
        phoneNumber
        batchCode
        feePlan
      }
      response {
        message
        status
      }
    }
  }
  
`;
