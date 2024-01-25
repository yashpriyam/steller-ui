import { userPaymentModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const createUserPayment = async (
  parent: undefined,
  args: { input: UserPaymentSchemaType }
): Promise<UserPaymentDataOutputType> => {
  const { USER_PAYMENT_CREATION_FAILED } = errorMessages.USER_PAYMENT_MODEL;
  const errorData: CustomResponseType = {
    message: USER_PAYMENT_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    const { USER_PAYMENT_CREATION_SUCCESS } = localMessages.USER_PAYMENT_MODEL;
    const { input } = args;

    const { user, batch, feePlan, installmentId, isApproved, isRejected, isPending, image } = input
    // Validate required input fields
    if (!image || !installmentId) return { response: errorData };

    // Create the user payment in the database
    const newUserPaymentData = await userPaymentModel.create({
        user,
        batch, 
        feePlan, 
        installmentId, 
        isApproved, 
        isRejected, 
        isPending, 
        image
    });

    return {
      userPaymentData: newUserPaymentData,
      response: newUserPaymentData
        ? {
            message: USER_PAYMENT_CREATION_SUCCESS,
            status: statusCodes.OK,
          }
        : errorData,
    };
  } catch (err) {
    console.error(err);
    return {
      response: errorData,
    };
  }
};
