import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: LoginUserDataInputType!) {
    login(data: $data) {
      userData {
        email
        name
        password
        phoneNumber
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
        status
        message
      }
      credentials
    }
  }
`;
