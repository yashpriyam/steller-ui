import { isValidEmail, getRandomNumOfDigits, timeAfterMins, sendEmail, getHtmlForEmailVerification } from "@utils";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { emailVerificationModel, User } from "@models";
export const sendOtpToRegisteredUser = async (
    _parent: undefined,
    args: { email: string }
): Promise<OtpUserOutputType | void> => {
    const { OTP_SENT_SUCCESS, EMAIL_VERIFICATION_SUBJECT } = localMessages.EMAIL_VERIFICATION_MODEL;
    const { UNREGISTERED_EMAIL, OTP_SENT_FAILED } = errorMessages.EMAIL_VERIFICATION_MODEL;
    const { INVALID_EMAIL } = errorMessages.USER;
    try {
        const { email } = args;

        if (!isValidEmail(email)) {
            return {
                response: {
                    message: INVALID_EMAIL,
                    status: statusCodes.OK,
                },
            };
        }

        const userData = await User.findOne({ email });

        if (!userData) {
            return {
                response: {
                    message: UNREGISTERED_EMAIL,
                    status: statusCodes.OK,
                },
            };
        }

        const emailValidityMinutes = 30;
        const emailOtp = getRandomNumOfDigits(6);
        const expiresAt = timeAfterMins(emailValidityMinutes);

        const otpData: CreateUserOtpType = await emailVerificationModel.create({ email, emailOtp, expiresAt });

        await sendEmail({
            subject: EMAIL_VERIFICATION_SUBJECT,
            html: getHtmlForEmailVerification(otpData,emailValidityMinutes),
            to: email,
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