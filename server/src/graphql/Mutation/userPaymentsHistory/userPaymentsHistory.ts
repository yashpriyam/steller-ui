import { batchModel, userPaymentModel, variableModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { getUnauthorizedResponse, getVariableValuesByKey, imageVariableKeys, isLoggedIn, uploadImage } from "@utils";

export const createUserPayment = async (
  parent: undefined,
  args: { input: UserPaymentSchemaType },
  { contextData }: ContextType
): Promise<UserPaymentDataOutputType> => {
  const { USER_PAYMENT_CREATION_FAILED } = errorMessages.USER_PAYMENT_MODEL;
  const { VARIABLE_NOT_FOUND } = errorMessages.VARIABLE;
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

    const baseFolderName = await getVariableValuesByKey(imageVariableKeys.cloudinaryBaseFolder)
    const subFolderName = await getVariableValuesByKey(imageVariableKeys.userPaymentReceipt)
    if (!subFolderName || !baseFolderName) return {
      response: {
        message: VARIABLE_NOT_FOUND,
        status:statusCodes.BAD_REQUEST,
      },
    }
    const imageFolderName = `${baseFolderName?.value[0]}/${subFolderName?.value[0]}`

    const { feePlan, installmentId, isApproved, isRejected, isPending } = input
    // Validate required input fields
    if (!input.imageUrl || !imageFolderName || !installmentId) return { response: errorData };

    const imageData = await uploadImage(input.imageUrl, imageFolderName)

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
