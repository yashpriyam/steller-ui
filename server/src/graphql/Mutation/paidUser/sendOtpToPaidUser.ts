import {
  isValidEmail,
  getRandomNumOfDigits,
  timeAfterMins,
  sendEmail,
} from "@utils";
import { otpModel, paidUser } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
export const sendOtpToPaidUser = async (
  _parent: undefined,
  args: { email: string }
): Promise<OtpUserOutputType | unknown> => {
  const { OTP_SENT_SUCCESS } = localMessages.OTP_MODEL;
  const { OTP_EMAIL_INVALID, OTP_SENT_FAILED } = errorMessages.OTP_MODEL;
  try {
    const { email } = args;    
    if (isValidEmail(email)) {
      const emailValidityMinutes = 30;
      const user = await paidUser.exists({ email });
      if (user) {
        const createdOtpData: CreateUserOtpType =
          await otpModel.findOneAndUpdate(
            { email },
            {
              emailOtp: getRandomNumOfDigits(6),
              expiresAt: timeAfterMins(emailValidityMinutes),
            },
            { upsert: true, new: true }
          );        
        await sendEmail({
          subject: `Your One-Time Password (OTP) for Webmaster Reset Password`,
          html: `<div><h2>${createdOtpData.emailOtp}</h2> </div>
                <br/ >
            <div>Please enter this OTP on the verification page to verify your identity. The OTP is valid for ${emailValidityMinutes} mins, so be sure to use it promptly.</div>~
            <br/ >
            <div>If you did not attempt to reset passowrd for Webmaster, please ignore this email.</div>
            <br/ >
            <br />
            Best regards,
            <br />
            The Webmaster Team`,
          to: email,
        });
      }

      return {
          message: OTP_SENT_SUCCESS,
          status: statusCodes.OK,
      };
    } else
      return {
          message: OTP_EMAIL_INVALID,
          status: statusCodes.OK,
      };
  } catch (err) {
    return {
        message: OTP_SENT_FAILED,
        status: statusCodes.BAD_REQUEST,
    };
  }
};
