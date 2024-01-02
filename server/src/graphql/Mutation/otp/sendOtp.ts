import {
  isValidEmail,
  getRandomNumOfDigits,
  timeAfterMins,
  sendEmail,
} from "@utils";
import { otpModel } from "../../../schema/otp-model";
import { localMessages, errorMessages,statusCodes } from "@constants";
export const sendOtp = async (
  _parent: undefined,
  args: { email: string }
): Promise<OtpUserOutputType | unknown> => {
  const { OTP_SENT_SUCCESS } = localMessages.OTP_MODEL;
  const { OTP_EMAIL_INVALID, OTP_SENT_FAILED } = errorMessages.OTP_MODEL;
  try {
    const { email } = args;
    if (isValidEmail(email)) {
      const emailValidityMinutes = 30;
      const otpData: CreateUserOtpType = await otpModel.create({
        email,
        emailOtp: getRandomNumOfDigits(6),
        expiresAt: timeAfterMins(emailValidityMinutes),
      });
      await sendEmail({
        subject: `Your One-Time Password (OTP) for Webmaster Registration`,
        html: `<div><h2>${otpData.emailOtp}</h2> </div>
                <br/ >
            <div>Please enter this OTP on the registration page to verify your identity. The OTP is valid for ${emailValidityMinutes} mins, so be sure to use it promptly.</div>
            <br/ >
            <div>If you did not attempt to register for Webmaster, please ignore this email.</div>
            <br/ >
            <br />
            Best regards,
            <br />
            The Webmaster Team`,
        to: email,
      });
      return {
        response: {
          message: OTP_SENT_SUCCESS,
          status: statusCodes.OK,
        },
      };
      }
    else return {
        response: {
          message: OTP_EMAIL_INVALID,
          status: statusCodes.OK,
        },
      }
  } catch (err) {
      return {
        response: {
          message: OTP_SENT_FAILED,
          status: statusCodes.BAD_REQUEST,
        },
      };
  }
};
