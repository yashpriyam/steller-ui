import jwt from "jsonwebtoken";
import { User } from "@models";
import { isValidEmail } from "@utils";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const login = async (
  _parent: undefined,
  args: { userData: loginUserInputType },
  { res }: ContextType
): Promise<unknown> => {
  try {
    const { email, password } = args.userData;
    const user = User.find((u: RegisterType) => u.email === email);
      // if (!user || !(await bcrypt.compare(password, user.password))) {
      //   return { message: "Invalid email or password" };
      // }
    return {
      response: {
        message: "login successfully!",
        status: 200,
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
