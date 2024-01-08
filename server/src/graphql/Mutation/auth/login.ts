import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";
import { paidUser } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const login = async (
  _parent: undefined,
  args: { data: loginUserInputType },
  { res }: ContextType
): Promise<unknown> => {
  try {
    const { email, password } = args.data;
    const user = await paidUser.findOne({ email });
     const hashPassword = bcrypt.hashSync(password, user?.password?.salt||"");
      const isValidPassword = user?.password?.hash === hashPassword;
     if (!user || !isValidPassword) {
       return {
         response: {
           message: "Invalid email or password",
           status: statusCodes.BAD_REQUEST,
         },
       };
     }
    return {
      response: {
        message: "login successfully",
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return {
      response: {
        message: "login failed",
        status: 400,
      },
    };
  }
};
