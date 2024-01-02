
export const getHtmlForEmailVerification = (otpData: { emailOtp: string }, emailValidityMinutes : number) : string => {
    return `
          <div>
              <h2>${otpData.emailOtp}</h2>
              <br/>
              <div>
                  Please enter this OTP on the verification page to verify your email. 
                  The OTP is valid for ${emailValidityMinutes} mins, so be sure to use it promptly.
              </div>
              <br/>
              <br/>
              Best regards,
              <br/>
              The Webmaster Team
          </div>
      `
}