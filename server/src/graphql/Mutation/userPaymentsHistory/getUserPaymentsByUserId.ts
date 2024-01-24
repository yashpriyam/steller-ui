import { userPaymentModel } from "@models";
import { errorMessages, statusCodes, localMessages } from "@constants";

export const getUserPaymentsByUserId = async (
  parent: undefined,
  args: { userId: string }
): Promise<UserPaymentDataOutputType[]> => {


  const { USER_PAYMENT_FETCH_FAILED } = errorMessages.USER_PAYMENT_MODEL;
  const { USER_PAYMENTS_FETCHED_SUCCESSFULLY } =
    localMessages.USER_PAYMENT_MODEL;
  const errorData: CustomResponseType = {
    message: USER_PAYMENT_FETCH_FAILED,
    status: statusCodes.NOT_FOUND,
  };

  try {
    const { userId } = args;
    if (!userId) return [{ response: errorData }];

    // Fetch user payments by userId
    const userPayments = await userPaymentModel
  .find({ user: userId })
  .populate('user batch feePlan')
  .exec();

    // Map the user payment data to the expected format
    const mappedUserPayments = userPayments.map((userPayment) => ({
      userPaymentData: userPayment,
      response: {
        message: USER_PAYMENTS_FETCHED_SUCCESSFULLY,
        status: statusCodes.OK,
      },
    }));

    return mappedUserPayments;
  } catch (err) {
    console.error(err);
    return [{ response: errorData }];
  }
};
