import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($data: LoginUserDataInputType!) {
    login(data: $data) {
      response {
        status
        message
      }
      credentials
    }
  }
`;
