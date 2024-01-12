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
    const isValidPassword = bcrypt.compare(password, user?.password || "");
    if (!user || !isValidPassword) {
      return {
        response: errorData,
      };
    }
    const { JWT_SECRET_VALUE, JWT_SECRET_KEY } = process.env;
    if (JWT_SECRET_VALUE && JWT_SECRET_KEY) {
      const token = jwt.sign({user}, JWT_SECRET_VALUE);
      res.cookie(JWT_SECRET_KEY,token);
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
