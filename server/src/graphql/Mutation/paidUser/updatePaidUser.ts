import { paidUser } from "@models";
import bcrypt from "bcrypt";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { generateNestedUpdate } from "@utils";

export const updatePaidUser = async (
  _parent: undefined,
  args: { data: updatePaidUserInput }
): Promise<PaidUserOutputType | unknown> => {
  const { PAID_USER_UPDATED_SUCCESS } = localMessages.PAID_USER_MODEL;
  const { PAID_USER_UPDATION_FAILED } = errorMessages.PAID_USER_MODEL;
  const errorData: CustomResponseType = {
    message: PAID_USER_UPDATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { email, updatedNewData } = args.data;
    const password: Record<string, string> = {
      salt: "",
      hash: "",
    };
    if (updatedNewData.password) {
      const SALT_ROUNDS = 10;
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      const hash = await bcrypt.hash(updatedNewData.password, salt);
      password.salt = salt;
      password.hash = hash;
    }
    const updatedData = generateNestedUpdate({
      ...updatedNewData,
      password: password,
    });
    const updatedPaidUser = await paidUser.findOneAndUpdate(
      { email },
      { $set: updatedData },
      { upsert: true, new: true }
    );
    if (!updatedPaidUser) {
      return {
        response: errorData,
      };
    }
    return {
      paidUserData: updatedPaidUser,
      response: {
        message: PAID_USER_UPDATED_SUCCESS,
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return {
      response: errorData,
    };
  }
};
