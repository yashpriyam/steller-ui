import jwt from "jsonwebtoken";
import { User } from "@models";
import {
  getRegistrationEmailForAdmin,
  getRegistrationEmailForUser,
  sendEmail,
  isValidEmail,
  isValidPhoneNumber,
} from "@utils";
import { UserInputError } from "apollo-server-express";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const registerUser = async (
  _parent: undefined,
  args: { data: RegisterType },
  { res }: ContextType,
): Promise<RegisterOutputType | UserInputError | unknown> => {
  const { USER_EXIST } = errorMessages.USER;
  const { USER_REGISTERED_SUCCESSFULLY} = localMessages.USER;
  try {
    const { data } = args;

    const {
      name,
      email,
      phoneNumber,
      isJobSeeker,
      occupation,
      sessionPreference,
      expectedSalary,
      collegeName,
    } = data;

    if (!isValidEmail(email)) {
      throw new UserInputError(errorMessages.USER.INVALID_EMAIL);
    } else if (!isValidPhoneNumber(phoneNumber)) {
      throw new UserInputError(errorMessages.USER.INVALID_PHONE_NUMBER);
    }

    const isUserExist = await User.exists({ email });
    if (isUserExist) {
      return {
        response: {
          status: statusCodes.BAD_REQUEST,
          message:USER_EXIST
        }
      }
    }

    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);

    const savedUser = await User.create({
      name: capitalizedName,
      email,
      phoneNumber,
      isJobSeeker,
      occupation,
      sessionPreference,
      expectedSalary,
      collegeName,
    });

    const { IST: time } = savedUser;

    const emailDetails: EmailType = {
      name: capitalizedName,
      phoneNumber,
      email,
      time,
    };
    const userData:RegisterType = {
      email: savedUser.email,
      name: savedUser.name,
      phoneNumber: savedUser.phoneNumber,
      collegeName: savedUser.collegeName,
      expectedSalary: savedUser.expectedSalary,
      isJobSeeker: savedUser.isJobSeeker,
      occupation: savedUser.occupation,
      sessionPreference:savedUser.sessionPreference,
    }
    await Promise.allSettled([
      sendEmail({
        ...getRegistrationEmailForUser(emailDetails),
        to: email,
      }),
      sendEmail({
        ...getRegistrationEmailForAdmin(emailDetails),
        to: process.env.SENDER_EMAIL || "",
      }),
    ]);

    const token = jwt.sign({ user: savedUser }, process.env.JWT_SECRET_VALUE || "");
    res.cookie(process.env.JWT_SECRET_KEY || "", token);
    return {
      userData,
      response: {
        message: USER_REGISTERED_SUCCESSFULLY,
        status:statusCodes.OK,
      }
    };
  } catch (error) {
    return error;
  }
};
