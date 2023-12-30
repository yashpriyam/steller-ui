import { isValidEmail, getRandomNumOfDigits, timeAfterMins, sendEmail } from "@utils";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { otpModel, User } from "@models";
export const sendOtpToRegisteredUser = async (
    _parent: undefined,
    args: { email: string }
): Promise<OtpOutputType | void> => {
    const { OTP_SENT_SUCCESS } = localMessages.OTP_MODEL;
    const { UNREGISTERED_EMAIL, OTP_SENT_FAILED } = errorMessages.OTP_MODEL;
    const { INVALID_EMAIL } = errorMessages.USER;
    try {
        const { email } = args;
        if (isValidEmail(email)) {
            const userData = await User.findOne({ email });
            if (userData) {
                const emailValidityMinutes = 30;
                const otpData: CreateOtpType = await otpModel.create({
                    email,
                    emailOtp: getRandomNumOfDigits(6),
                    expiresAt: timeAfterMins(emailValidityMinutes),
                });
                await sendEmail({
                    subject: `Your One-Time Password (OTP) for email verification`,
                    html: `<div><h2>${otpData.emailOtp}</h2> </div>
                    <br/ >
                    <div>Please enter this OTP on the verification page to verify your email. The OTP is valid for ${emailValidityMinutes} mins, so be sure to use it promptly.</div>
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
                    message: UNREGISTERED_EMAIL,
                    status: statusCodes.OK
                }
            }
        }
        else return {
            response: {
                message: INVALID_EMAIL,
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