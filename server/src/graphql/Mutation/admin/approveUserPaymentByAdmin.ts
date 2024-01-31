import { userPaymentModel, variableModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import {
  getUnauthorizedResponse,
  isLoggedIn,
  sendEmail,
  uploadImage,
} from "@utils";
import { generatePaymentApprovalEmail } from "utils/getPaymentApprovalHtml";

export const approveUserPaymentByAdmin = async (
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

    const { paymentId, image, isApproved, isPending, isRejected } = input;

    const imageFolderName = await variableModel.findOne({
      key: "userPaymentReceiptFolder",
    });

    // Validate required input fields
    if (!paymentId || !image || !imageFolderName)
      return { response: errorData };

    const imageData = await uploadImage(image, imageFolderName?.value);

    // Update the user payment information
    const updatedUserPaymentData = await userPaymentModel
      .findByIdAndUpdate(
        { _id: paymentId },
        {
          $set: {
            image: imageData,
            isApproved,
            isPending,
            isRejected,
          },
        },
        { new: true }
      )
      .populate("user");

    if (updatedUserPaymentData) {
      const emailData: PaymentApprovalEmailData = {
        status: "approved",
        date: new Date().toISOString().slice(0, 10),
        receiptImageUrl: imageData.secureUrl,
        userEmail: updatedUserPaymentData.user.email,
      };

      const approvalMail = await sendEmail({
        subject: "Payment Approval Notification",
        html: generatePaymentApprovalEmail(emailData),
        to: emailData.userEmail,
      });
    }

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
