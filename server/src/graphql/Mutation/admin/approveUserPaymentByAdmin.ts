import { userPaymentModel, variableModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import {
  getUnauthorizedResponse,
  isLoggedIn,
  sendEmail,
  uploadImage,
} from "@utils";

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
      .findOneAndUpdate(
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
      const approvalMail = await sendEmail({
        subject: `Payment Approval Notification`,
        html: `
          <div>
            <h2>Payment Approval Notification</h2>
            <br />
            <div>
             Your Payment has been <strong>approved</strong>.
            </div>
            <div>
              Date: <strong>${new Date().toISOString().slice(0, 10)}</strong>
            </div>
            <br />
            <div>
              <img src="${
                imageData.secureUrl
              }" alt="Receipt" style="max-width: 100%; height: auto;" />
            </div>
            <br />
            <div>
              If you have any questions or concerns, please contact our support team.
            </div>
            <br />
            <br />
            Best regards,
            <br />
            The Webmaster Team
          </div>
        `,
        to: updatedUserPaymentData.user.email,
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
