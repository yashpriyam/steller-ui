import { User } from "../../../schema/userSchema";
import { registerType } from "../../types";
import {
  getRegistrationEmailForAdmin,
  getRegistrationEmailForUser,
} from "../../../utils/registrationEmail";
import { sendEmail } from "../../../utils/sendEmail";
import { isValidEmail, isValidPhoneNumber } from "../../../utils/validate";
import { UserInputError } from "apollo-server-express";

export const registerUser = async (
  _parent: any,
  args: { data: registerType }
) => {
  try {
    const { data } = args;

    if (!data) {
      throw new UserInputError("email and phone number does not found");
    }

    const {
      name: firstName,
      email,
      phoneNumber,
      isJobSeeker,
      occupation,
      sessionPreference,
      expectedSalary,
    } = data;

    if (!isValidEmail(email)) {
      throw new UserInputError("invalid email address");
    } else if (!isValidPhoneNumber(phoneNumber)) {
      throw new UserInputError("invalid phone number");
    }

    const savedUser = await User.create({
      name: firstName.charAt(0).toUpperCase() + firstName.slice(1),
      email,
      phoneNumber,
      isJobSeeker,
      occupation,
      sessionPreference,
      expectedSalary,
    });
    const { name: userName = "", IST: time } = savedUser;
    await Promise.allSettled([
      sendEmail({
        ...getRegistrationEmailForUser({ userName, phoneNumber, email, time }),
        to: email,
      }),
      sendEmail({
        ...getRegistrationEmailForAdmin({ userName, phoneNumber, email, time }),
        to: process.env.SENDER_EMAIL || "",
      }),
    ]);
    return savedUser;
  } catch (error) {
    return error;
  }
};
