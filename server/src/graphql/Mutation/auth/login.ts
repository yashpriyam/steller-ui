import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const login = async (
  _parent: undefined,
  args: { data: loginUserInputType },
  { res, req }: ContextType
): Promise<CustomResponseType | unknown> => {
  const { USER_LOGIN_SUCCESS } = localMessages.USER;
  const { USER_LOGIN_FAILED } = errorMessages.USER;
  const errorData: CustomResponseType = {
    message: USER_LOGIN_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { email, password } = args.data;
    const lowerCaseEmail = email.toLowerCase();
    const user = await User.findOne({ email: lowerCaseEmail });
    const isValidPassword =await bcrypt.compare(password, user?.password || "");
    if (!user || !isValidPassword) {
      return {
        response: errorData,
      };
    }
    const userInfo = user.toObject();
    delete userInfo.password;
    const { JWT_SECRET_VALUE, JWT_SECRET_KEY } = process.env;
    if (JWT_SECRET_VALUE && JWT_SECRET_KEY) {
      const token = jwt.sign({ user: userInfo }, JWT_SECRET_VALUE);
      res.cookie(JWT_SECRET_KEY,token, {
        sameSite: "none",
        secure: true,
        domain: req.headers.origin
      });
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
