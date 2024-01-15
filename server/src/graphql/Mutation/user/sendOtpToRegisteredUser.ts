import { isValidEmail, getRandomNumOfDigits, timeAfterMins, sendEmail, getEmailVerificationMessage } from "@utils";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { otpModel, User } from "@models";
export const sendOtpToRegisteredUser = async (
    _parent: undefined,
    args: { email: string }
): Promise<OtpUserOutputType > => {
    const { EMAIL_VERIFICATION_SUBJECT } = localMessages.TEXT;
    const { OTP_SENT_SUCCESS } = localMessages.OTP_MODEL;
    const { UNREGISTERED_EMAIL, OTP_SENT_FAILED } = errorMessages.OTP_MODEL;
    const { INVALID_EMAIL } = errorMessages.USER;
    try {
        const { email } = args;
    const lowerCaseEmail = email.toLowerCase();
        if (!isValidEmail(lowerCaseEmail)) {
            return {
                response: {
                    message: INVALID_EMAIL,
                    status: statusCodes.BAD_REQUEST,
                },
            };
        }
      const userData = await User.exists({ email:lowerCaseEmail });      

        if (!userData) {
            return {
                response: {
                    message: UNREGISTERED_EMAIL,
                    status: statusCodes.BAD_REQUEST,
                },
            };
        }

        const emailValidityMinutes = 30;
        const emailOtp = getRandomNumOfDigits(6);
        const expiresAt = timeAfterMins(emailValidityMinutes);

        const otpData: CreateUserOtpType = await otpModel.findOneAndUpdate(
          { email:lowerCaseEmail },
          {
            emailOtp,
            expiresAt
          },
          { upsert: true, new: true }
        );

        await sendEmail({
            subject: EMAIL_VERIFICATION_SUBJECT,
            html: getEmailVerificationMessage({otpData,emailValidityMinutes}),
            to: lowerCaseEmail,
        });

        return {
            response: {
                message: OTP_SENT_SUCCESS,
                status: statusCodes.OK,
            },
        };
    } catch (err) {
        return {
            response: {
                message: OTP_SENT_FAILED,
                status: statusCodes.BAD_REQUEST,
            },
        };
    }
};