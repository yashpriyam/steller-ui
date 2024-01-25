import { userPaymentModel } from "@models";
import { errorMessages, statusCodes, localMessages } from "@constants";

export const getUserPaymentsByUserId = async (
  parent: undefined,
  args: { userId: string }
): Promise<UserAllPaymentDataOutputType> => {


  const { USER_PAYMENT_FETCH_FAILED } = errorMessages.USER_PAYMENT_MODEL;
  const { USER_PAYMENTS_FETCHED_SUCCESSFULLY } =
    localMessages.USER_PAYMENT_MODEL;
  const errorData: CustomResponseType = {
    message: USER_PAYMENT_FETCH_FAILED,
    status: statusCodes.NOT_FOUND,
  };

  try {
    const { userId } = args;
    if (!userId) return { response: errorData };

    // Fetch user payments by userId
    const userPayments = await userPaymentModel
  .find({ user: userId })
  .populate('user batch feePlan')
  .exec();


    return {
        userPaymentData: userPayments,
        response: {
          message: USER_PAYMENTS_FETCHED_SUCCESSFULLY,
          status: statusCodes.OK,
        },
      };
  } catch (err) {
    console.error(err);
    return { response: errorData };
  }
};
