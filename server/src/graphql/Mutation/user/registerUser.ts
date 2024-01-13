import jwt from "jsonwebtoken";
import { User, otpModel } from "@models";
import {
  getRegistrationEmailForAdmin,
  getRegistrationEmailForUser,
  sendEmail,
  isValidEmail,
  isValidPhoneNumber,
} from "@utils";
import { UserInputError } from "apollo-server-express";
import { errorMessages } from "@constants";

export const registerUser = async (
  _parent: undefined,
  args: { data: RegisterType },
  { res }: ContextType,
): Promise<RegisterType | UserInputError | unknown> => {
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
    return savedUser;
  } catch (error) {
    return error;
  }
};
