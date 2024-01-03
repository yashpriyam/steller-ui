import { gql } from "@apollo/client";

export const SEND_OTP = gql`
    mutation SendOtp($email: String!) {
        sendOtp(email: $email) {
            response {
                status
                message
            }
        }
    }
`;
