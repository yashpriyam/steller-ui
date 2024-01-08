import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { paidUser } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const login = async (
  _parent: undefined,
  args: { data: loginUserInputType },
  { res }: ContextType
): Promise<CustomResponseType | unknown> => {
  const { PAID_USER_LOGIN_SUCCESS } = localMessages.PAID_USER_MODEL;
  const { PAID_USER_LOGIN_FAILED } = errorMessages.PAID_USER_MODEL;
  const errorData: CustomResponseType = {
    message: PAID_USER_LOGIN_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { email, password } = args.data;
    const user = await paidUser.findOne({ email });
    const hashPassword = bcrypt.hashSync(password, user?.password?.salt || "");
    const isValidPassword = user?.password?.hash === hashPassword;
    if (!user || !isValidPassword) {
      return {
        response: errorData,
      };
    }
    const jwtSecret = process.env.JWT_SECRET;
    const jwtToken = process.env.JWT_TOKEN;
    if (jwtSecret && jwtToken) {
      const token = jwt.sign(user, jwtSecret, {
        expiresIn: "1h",
      });
      res.cookie(jwtToken, token, {
        httpOnly: true,
      });
    }
    return {
      response: {
        message: PAID_USER_LOGIN_SUCCESS,
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return {
      response: errorData,
    };
  }
};
