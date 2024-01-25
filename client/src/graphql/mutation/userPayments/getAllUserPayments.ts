import { gql } from "@apollo/client";

export const GET_USER_PAYMENTS = gql`
mutation GetUserPaymentsByUserId($userId: ID!) {
    getUserPaymentsByUserId(userId: $userId) {
      userPaymentData {
        _id
        user {
          _id
        }
        batch {
          _id
          batchCode
        }
        feePlan {
          _id
          name
          description
        }
        installmentId 
        isApproved
        isRejected
        isPending {
          totalAmount
          totalPendingAmount
        }
        image {
          publicId
          secureUrl
        }
      }
      response {
        message
        status
      }
    }
  }
  
`;
