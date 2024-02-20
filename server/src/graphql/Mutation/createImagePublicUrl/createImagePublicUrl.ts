import { errorMessages, localMessages, statusCodes } from "@constants";
import { getVariableValuesByKey, imageVariableKeys, uploadImage } from "@utils";

export const createImagePublicUrl = async (
  _parent: undefined,
  args: { url: string }
): Promise<CreateImagePublicUrlOutputType> => {
  const { PUBLIC_URL_SUCCESS } = localMessages.IMAGE;
  const { PUBLIC_URL_FAILED } = errorMessages.IMAGE;
  const { VARIABLE_NOT_FOUND } = errorMessages.VARIABLE;
  const errorData: CustomResponseType = {
    message: PUBLIC_URL_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
      const { url } = args;
      const baseFolderName = await getVariableValuesByKey(imageVariableKeys.cloudinaryBaseFolder)
      const subFolderName = await getVariableValuesByKey(imageVariableKeys.questions)
      if (!subFolderName || !baseFolderName) return {
        response: {
          message: VARIABLE_NOT_FOUND,
          status:statusCodes.BAD_REQUEST,
        },
      }
    const imageFolderName = `${baseFolderName?.value[0]}/${subFolderName?.value[0]}`
    const { secureUrl } = await uploadImage(url, imageFolderName);      
    return {
      publicUrl:secureUrl,
      response: {
        message: PUBLIC_URL_SUCCESS,
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return { response: errorData };
  }
};
