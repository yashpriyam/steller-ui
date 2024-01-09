import { gql } from "@apollo/client";

export const VERIFY_OTP_PAID_USER = gql`
  mutation VerifyOtpPaidUser($data: VerifyOtpPaidUserInputType!) {
    verifyOtpPaidUser(data: $data) {
      message
      status
    }
  }
`;