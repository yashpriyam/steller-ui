import { gql } from "@apollo/client"

export const UPDATE_PAID_USER_PASSWORD = gql`
mutation updatePaidUserPassword($data: updatePaidUserPasswordInputType!) {
  updatePaidUserPassword(data: $data) {
    message
    status
  }
}
`;