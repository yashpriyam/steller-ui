import { errorMessages, localMessages, statusCodes } from "@constants";
import { User, otpModel } from "@models";
import { isValidEmail } from "@utils";
import jwt from "jsonwebtoken";
export const verifyUserOtp = async (
  _parent: undefined,
  args: { data: { email: string; emailOtp: string } },
  { res }: ContextType
): Promise<CustomResponseType | unknown> => {
  const { OTP_VERIFIED_SUCCESS } = localMessages.OTP_MODEL;
  const { OTP_EMAIL_NOT_EXIST, OTP_EMAIL_INVALID } = errorMessages.OTP_MODEL;
  const errorData: CustomResponseType = {
    message: OTP_EMAIL_INVALID,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { data } = args;
    const { email, emailOtp } = data;
    const lowerCaseEmail = email.toLowerCase();
    if (isValidEmail(lowerCaseEmail)) {
      const userExist = await User.findOne({ email: lowerCaseEmail });
      if (userExist) {
        const otpDetails = await otpModel.findOne({
          email: lowerCaseEmail,
          emailOtp,
          expiresAt: {
            $gte: new Date(),
          },
        });
        if (!otpDetails) {
          return errorData;
        }
        const { JWT_SECRET_VALUE, JWT_SECRET_KEY } = process.env;
        if (JWT_SECRET_VALUE && JWT_SECRET_KEY) {
          const token = jwt.sign({ user: userExist }, JWT_SECRET_VALUE);
          res.cookie(JWT_SECRET_KEY, token);
        }
        return {
          message: OTP_VERIFIED_SUCCESS,
          status: statusCodes.OK,
        };
      } else {
        return {
          message: OTP_EMAIL_NOT_EXIST,
          status: statusCodes.BAD_REQUEST,
        };
      }
    } else return errorData;
  } catch (error) {
    return errorData;
  }
};
