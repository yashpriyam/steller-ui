import { User } from "@models";
import bcrypt from "bcrypt";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { isValidEmail } from "@utils";

export const updateUserPassword = async (
  _parent: undefined,
  args: { data: UpdateUserPasswordInput }
): Promise<CustomResponseType | unknown> => {
  const { USER_PASSWPRD_UPDATION_SUCCESS } = localMessages.USER;
  const { USER_PASSWPRD_UPDATION_FAILED,INVALID_EMAIL} = errorMessages.USER;
  const errorData: CustomResponseType = {
    message: USER_PASSWPRD_UPDATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { data } = args;
    const { email, password } = data;
    const lowerCaseEmail = email.toLowerCase();

    if (!isValidEmail(lowerCaseEmail)) {
      return {
        response: {
          message: INVALID_EMAIL,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
    let encodePassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      encodePassword = hash;
    }
    const updatedPaidUser = await User.findOneAndUpdate(
      { email:lowerCaseEmail },
      { password: encodePassword },
      { upsert: true, new: true }
    );
    if (!updatedPaidUser) {
      return errorData;
    }
    return {
      message: USER_PASSWPRD_UPDATION_SUCCESS,
      status: statusCodes.OK,
    };
  } catch (error) {
    return errorData;
  }
};
