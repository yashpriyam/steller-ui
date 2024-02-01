import { gql } from "@apollo/client";

export const REJECT_USER_PAYMENT = gql`
mutation RejectUserPaymentByAdmin($input: UpdateUserPaymentInput!) {
    rejectUserPaymentByAdmin(input: $input) {
      response {
        message
        status
      }
    }
  }  
`;
