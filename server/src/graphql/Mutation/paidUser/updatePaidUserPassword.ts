import { paidUser } from "@models";
import bcrypt from "bcrypt";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { generateNestedUpdate } from "@utils";

export const updatePaidUserPassword = async (
  _parent: undefined,
  args: { data: updatePaidUserPasswordInput }
): Promise<CustomResponseType | unknown> => {
  const { PAID_USER_UPDATED_SUCCESS } = localMessages.PAID_USER_MODEL;
  const { PAID_USER_UPDATION_FAILED } = errorMessages.PAID_USER_MODEL;
  const errorData: CustomResponseType = {
    message: PAID_USER_UPDATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { email, password } = args.data;      
    const encodePassword: Record<string, string> = {
      salt: "",
      hash: "",
    };
    if (password) {
      const SALT_ROUNDS = 10;
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(password, salt);
      encodePassword.salt = salt;
      encodePassword.hash = hash;
    }
    const updatedData = generateNestedUpdate({
      password: encodePassword,
    });    
    const updatedPaidUser = await paidUser.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { upsert: true, new: true }
    );    
    if (!updatedPaidUser) {
      return errorData;
    }
    return {
        message: PAID_USER_UPDATED_SUCCESS,
        status: statusCodes.OK,
    };
  } catch (error) {
    return errorData;
  }
};
