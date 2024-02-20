import { errorMessages, localMessages, statusCodes } from "@constants";
import { getSubFolderNameByKey, imageVariableKeys, uploadImage } from "@utils";

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
      const QUESTIONS_FOLDER = await getSubFolderNameByKey(imageVariableKeys.questions);
      if (!QUESTIONS_FOLDER) return {
        response: {
          message: VARIABLE_NOT_FOUND,
          status:statusCodes.BAD_REQUEST,
        },
      }
    const { secureUrl } = await uploadImage(url, QUESTIONS_FOLDER);      
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
