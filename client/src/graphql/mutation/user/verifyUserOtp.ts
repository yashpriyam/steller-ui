import { gql } from "@apollo/client";

export const VERIFY_USER_OTP = gql`
  mutation VerifyUserOtp($data: VerifyOtpPaidUserInputType!) {
    verifyUserOtp(data: $data) {
      response {
        message
        status
      }
      credentials
    }
  }
`;