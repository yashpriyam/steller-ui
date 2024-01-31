import { userPaymentModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import {
  getUnauthorizedResponse,
  isLoggedIn,
  sendEmail,
  generatePaymentApprovalEmail,
} from "@utils";

export const rejectUserPaymentByAdmin = async (
  parent: undefined,
  args: { input: UpdateUserPaymentInput },
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

    const { paymentId, isApproved, isPending, isRejected, rejectReason } = input;

    // Validate required input fields
    if (!paymentId)
      return { response: errorData };

    // Update the user payment information
    const updatedUserPaymentData = await userPaymentModel
      .findByIdAndUpdate(
        { _id: paymentId },
        {
          $set: {
            isApproved,
            isPending,
            isRejected,
            rejectReason
          },
        },
        { new: true }
      )
      .populate("user");

    if (updatedUserPaymentData) {
      const emailData: PaymentApprovalEmailData = {
        status: "Reject",
        date: new Date().toISOString().slice(0, 10),
        userEmail: updatedUserPaymentData.user.email,
        rejectReason
      };
      try {
        const approvalMail = await sendEmail({
          subject: "Payment Reject Notification",
          html: generatePaymentApprovalEmail(emailData),
          to: emailData.userEmail,
        });
      } catch (error) {
        console.error(error);
      }
    }

    return {
      userPaymentData: updatedUserPaymentData,
      response: {
            message:
              localMessages.USER_PAYMENT_MODEL.USER_PAYMENT_UPDATE_SUCCESS,
            status: statusCodes.OK,
          }
    };
  } catch (err) {
    console.error(err);
    return {
      response: errorData,
    };
  }
};
