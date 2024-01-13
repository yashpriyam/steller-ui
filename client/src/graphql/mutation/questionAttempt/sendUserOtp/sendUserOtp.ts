import { gql } from "@apollo/client";
export const SEND_OTP_REGISTER_USER = gql`
  mutation SendOtpToRegisteredUser($email: String!) {
    sendOtpToRegisteredUser(email: $email) {
      response {
        status
        message
      }
    }
  }
`;
