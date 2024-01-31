import { gql } from "@apollo/client";

export const UPDATE_USER_PAYMENT = gql`
mutation UpdateUserPayments($input: UserPaymentInput!) {
    updateUserPayments(input: $input) {
      userPaymentData {
        _id
        isApproved
        isRejected
        isPending {
           totalAmount
        }
        
      }
      response {
        message
        status
      }
    }
  }  
`;
