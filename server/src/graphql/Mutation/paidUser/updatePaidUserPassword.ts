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
    const { data } = args;
    const { email, password } = data;      
    let encodePassword = "";
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      encodePassword = hash;
    }  
    const updatedPaidUser = await paidUser.findOneAndUpdate(
      { email },
      {password:encodePassword},
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
