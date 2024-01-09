import { gql } from "@apollo/client"

export const UPDATE_PAID_USER = gql`
  mutation UpdatePaidUser($data: updatePaidUserInputType!) {
    updatePaidUser(data: $data) {
      paidUserData {
        username
        socialHandles {
          portfolio
          medium
          linkedIn
          github
        }
        sessionPreference
        profileImg {
          secureUrl
          publicId
        }
        professionalStatus
        expectedSalary
        email
        contact
        college
        batchCode
        address
      }
      response {
        status
        message
      }
    }
  }
`;