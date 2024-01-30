import { userPaymentModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import {
  getUnauthorizedResponse,
  isLoggedIn
} from "@utils";

export const updateUserPayments = async (
  parent: undefined,
  args: { input: Partial<UpdateUserPaymentSchemaType> },
  { contextData }: ContextType
): Promise<UserPaymentDataOutputType | unknown> => {
  const { USER_PAYMENT_UPDATE_FAILED } = errorMessages.USER_PAYMENT_MODEL;
  const errorData: CustomResponseType = {
    message: USER_PAYMENT_UPDATE_FAILED,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    const { input } = args;

    if (!isLoggedIn(contextData)) {
      return {
        response: getUnauthorizedResponse(),
      };
    }
    const userId = contextData.user._id;

    // Validate required input fields
    if (!userId || !input.installmentId) return { response: errorData };

    const {
      batch,
      createdAt,
      feePlan,
      image,
      imageUrl,
      installmentId,
      isApproved,
      isPending,
      isRejected,
    } = input;


    // Update the user payment information
    const updatedUserPaymentData = await userPaymentModel.findOneAndUpdate(
      { installmentId: input.installmentId, user: userId },
      {
        $set: {
          batch,
          createdAt,
          feePlan,
          imageUrl,
          installmentId,
          isApproved,
          isPending,
          isRejected,
        },
      },
      { new: true }
    );

    return {
      userPaymentData: updatedUserPaymentData,
      response: updatedUserPaymentData
        ? {
            message:
              localMessages.USER_PAYMENT_MODEL.USER_PAYMENT_UPDATE_SUCCESS,
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
