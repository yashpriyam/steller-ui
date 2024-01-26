import { gql } from "@apollo/client";

export const CREATE_USER_PAYMENTS = gql`
mutation CreateUserPayment($input: UserPaymentCreateInput) {
    createUserPayment(input: $input) {
      userPaymentData {
        _id
        user {
          _id
        }
        batch {
          _id
        }
        feePlan {
          _id
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
        createdAt
        updatedAt
      }
      response {
        message
        status
      }
    }
  }  
`;
