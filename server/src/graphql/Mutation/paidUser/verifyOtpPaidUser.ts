import { errorMessages, localMessages, statusCodes } from "@constants";
import { paidUser, otpModel } from "@models";
import { isValidEmail } from "@utils";
import jwt from "jsonwebtoken";
export const verifyOtpPaidUser = async (
  _parent: undefined,
  args: { data: { email: string; emailOtp: string } },
  { res }: ContextType
): Promise<unknown> => {
  const { OTP_VERIFIED_SUCCESS } = localMessages.OTP_MODEL;
  const { OTP_EMAIL_NOT_EXIST, OTP_EMAIL_INVALID } = errorMessages.OTP_MODEL;
  const errorData: CustomResponseType = {
    message: OTP_EMAIL_INVALID,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { data } = args;
    const { email, emailOtp } = data;
    if (isValidEmail(email)) {
      const userExist = await paidUser.exists({ email });
      if (userExist) {
        const otpDetails = await otpModel.findOne({
          email,
          emailOtp,
          expiresAt: {
            $gte: new Date(),
          },
        });
        if (!otpDetails) {
          return errorData;
        }
        const jwtSecret = process.env.JWT_SECRET;
        const jwtToken = process.env.JWT_TOKEN;
        if (jwtSecret && jwtToken) {
          const token = jwt.sign({ email, userExist }, jwtSecret, {
            expiresIn: "1h",
          });
          res.cookie(jwtToken, token, {
            httpOnly: true,
          });
        }
        return {
          message: OTP_VERIFIED_SUCCESS,
          status: statusCodes.OK,
        };
      } else {
        return {
          message: OTP_EMAIL_NOT_EXIST,
          status: statusCodes.OK,
        };
      }
    } else return errorData;
  } catch (error) {
    return errorData;
  }
};
