import { User } from "../../../schema/userSchema";
import { RegisterType } from "../../types";
import {
  getRegistrationEmailForAdmin,
  getRegistrationEmailForUser,
} from "../../../utils/registrationEmail";
import { sendEmail } from "../../../utils/sendEmail";
import { isValidEmail, isValidPhoneNumber } from "../../../utils/validate";
import { UserInputError } from "apollo-server-express";
import { errorMessage } from "../../../constants/errorMessages";

export const registerUser = async (
  _parent: undefined,
  args: { data: RegisterType }
) => {
  try {
    const { data } = args;

    if (!data) {
      throw new UserInputError(errorMessage.USER.EMAIL_AND_PHONE_NOT_FOUND);
    }

    const {
      name,
      email,
      phoneNumber,
      isJobSeeker,
      occupation,
      sessionPreference,
      expectedSalary,
    } = data;

    if (!isValidEmail(email)) {
      throw new UserInputError(errorMessage.USER.INVALID_EMAIL);
    } else if (!isValidPhoneNumber(phoneNumber)) {
      throw new UserInputError(errorMessage.USER.INVALID_PHONE_NUMBER);
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
    });

    const { IST: time } = savedUser;

    const emailDetails = {
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
    return savedUser;
  } catch (error) {
    return error;
  }
};
