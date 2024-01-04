import { localMessages } from "@constants";

const { 
    BEST_REGARDS,
    THE_WEBMASTERS_TEAM,
    PLEASE_ENTER_OTP_TO_VERIFY_EMAIL,
    THE_OTP_IS_VALID_FOR,
    USE_IT_PROMPTLY
} = localMessages.TEXT;

export const getEmailVerificationMessage = ({ otpData, emailValidityMinutes }: EmailOtpDataType): string => {
    return `
          <div>
              <h2>${otpData.emailOtp}</h2>
              <br/>
              <div>
                  ${PLEASE_ENTER_OTP_TO_VERIFY_EMAIL} 
                  ${THE_OTP_IS_VALID_FOR} ${emailValidityMinutes} ${USE_IT_PROMPTLY}
              </div>
              <br/>
              <br/>
              ${BEST_REGARDS},
              <br/>
              ${THE_WEBMASTERS_TEAM}
          </div>
      `
}