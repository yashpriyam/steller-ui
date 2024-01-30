import { gql } from "@apollo/client";

export const GET_ALL_USERS_PAYMENTS = gql`
mutation GetAllUserPayments($input: GetAllUserPaymentsInput) {
    getAllUserPayments(input: $input) {
      userPaymentData {
        _id
        installmentId
        user {
          _id
          name
          email
        }
        feePlan {
          _id
        }
        batch {
          _id
        }
        isApproved
        isRejected
        image {
          secureUrl
          publicId
        }
        createdAt
        updatedAt
      }
      response {
        status
        message
      }
    }
  }  
`;
