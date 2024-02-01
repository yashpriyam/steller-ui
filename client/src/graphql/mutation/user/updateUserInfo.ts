import { gql } from "@apollo/client";

export const UPDATE_USER_INFO = gql`
mutation UpdateUser($input: PartialUserSchemaType) {
    updateUser(input: $input) {
      userData {
        email
        name
        phoneNumber
        password
        isJobSeeker
        occupation
        sessionPreference
        expectedSalary
        IST
        collegeName
        location
        courseYear
        course
        branch
        batchCode
        feePlan
        profileImage {
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
