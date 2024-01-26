import { batchModel, userPaymentModel, variableModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { getUnauthorizedResponse, isLoggedIn, uploadImage } from "@utils";

export const createUserPayment = async (
  parent: undefined,
  args: { input: UserPaymentSchemaType },
  { contextData }: ContextType
): Promise<UserPaymentDataOutputType> => {
  const { USER_PAYMENT_CREATION_FAILED } = errorMessages.USER_PAYMENT_MODEL;
  const errorData: CustomResponseType = {
    message: USER_PAYMENT_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    const { USER_PAYMENT_CREATION_SUCCESS } = localMessages.USER_PAYMENT_MODEL;
    const { input } = args;
    
    if (!isLoggedIn(contextData)) {
      return {
        response: getUnauthorizedResponse(),
      };
    }
    const user = contextData.user._id;

    const batch = await batchModel.findOne({batchCode: input.batch})

    const imageFolderName = await variableModel.findOne({key: 'userPaymentReceiptFolder'})


    const { feePlan, installmentId, isApproved, isRejected, isPending } = input
    // Validate required input fields
    if (!input.imageUrl || !imageFolderName?.value || !installmentId) return { response: errorData };

    const imageData = await uploadImage(input.imageUrl, imageFolderName?.value)

    // Create the user payment in the database
    const newUserPaymentData = await userPaymentModel.create({
        user,
        batch: batch?._id, 
        feePlan, 
        installmentId, 
        isApproved, 
        isRejected, 
        isPending, 
        image: imageData
    });

    return {
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
