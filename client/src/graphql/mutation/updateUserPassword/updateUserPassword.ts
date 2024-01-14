import { gql } from "@apollo/client";

export const UPDATE_USER_PASSWORD = gql`
  mutation UpdateUserPassword($data: updatePaidUserPasswordInputType!) {
    updateUserPassword(data: $data) {
      message
      status
    }
  }
`;