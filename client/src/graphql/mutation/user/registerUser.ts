import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($data: RegistrationInputType!) {
    registerUser(data: $data) {
      response {
        status
        message
      }
      userData {
        sessionPreference
        phoneNumber
        occupation
        name
        collegeName
        email
        isJobSeeker
        expectedSalary
      }
    }
  }
`;
