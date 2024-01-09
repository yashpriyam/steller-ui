import { gql } from "@apollo/client";

export const SEND_OTP_PAID_USER = gql`
  mutation SendOtpToPaidUser($email: String!) {
    sendOtpToPaidUser(email: $email) {
      message
      status
    }
  }
`;