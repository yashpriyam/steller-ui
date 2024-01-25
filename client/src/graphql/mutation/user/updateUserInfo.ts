import { gql } from "@apollo/client";

export const UPDATE_USER_INFO = gql`
mutation UpdateUser($input: PartialUserSchemaType) {
    updateUser(input: $input) {
      userData {
        email
        name
        phoneNumber
      }
      response {
        message
        status
      }
    }
  }  
`;