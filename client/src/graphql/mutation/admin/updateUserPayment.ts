import { gql } from "@apollo/client";

export const UPDATE_USER_PAYMENT = gql`
mutation ApproveUserPaymentByAdmin($input: UpdateUserPaymentInput!) {
    approveUserPaymentByAdmin(input: $input) {
      response {
        message
        status
      }
    }
  }  
`;
