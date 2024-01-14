import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const login = async (
  _parent: undefined,
  args: { data: loginUserInputType },
  { res }: ContextType
): Promise<CustomResponseType | unknown> => {
  const { USER_LOGIN_SUCCESS } = localMessages.USER;
  const { USER_LOGIN_FAILED } = errorMessages.USER;
  const errorData: CustomResponseType = {
    message: USER_LOGIN_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { email, password } = args.data;
    const user = await User.findOne({ email });
    const isValidPassword =await bcrypt.compare(password, user?.password || "");
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
        message: USER_LOGIN_SUCCESS,
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return {
      response: errorData,
    };
  }
};
