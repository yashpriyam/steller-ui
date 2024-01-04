import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation RegisterUser($data: RegistrationInputType!) {
    registerUser(data: $data) {
      name
      email
      phoneNumber
      isJobSeeker
      occupation
      sessionPreference
      expectedSalary
      collegeName
    }
  }
`;
