import { paidUser } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
export const createPaidUser = async (
  _parent: undefined,
  args: { data: PaidUserInputType }
): Promise<PaidUserOutputType | unknown> => {
  const { PAID_USER_CREATION_SUCCESS } = localMessages.PAID_USER_MODEL;
  const { PAID_USER_CREATION_FAILED } = errorMessages.PAID_USER_MODEL;
  const errorData: CustomResponseType = {
    message: PAID_USER_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { data } = args;
    const {
      contact,
      email,
      username,
      address,
      batchCode,
      college,
      expectedSalary,
      password,
      professionalStatus,
      profileImg,
      sessionPreference,
      socialHandles,
    } = data;

    const paidUserData = await paidUser.create({
      email,
      contact,
      address,
      batchCode,
      username,
      college,
      expectedSalary,
      password,
      professionalStatus,
      profileImg,
      sessionPreference,
      socialHandles,
    });
    console.log({ paidUserData });

    const response: CustomResponseType = paidUserData
      ? {
          message: PAID_USER_CREATION_SUCCESS,
          status: statusCodes.CREATED,
        }
      : errorData;
    return {
      paidUserData,
      response,
    };
  } catch (error) {
    return {
      response: errorData,
    };
  }
};
