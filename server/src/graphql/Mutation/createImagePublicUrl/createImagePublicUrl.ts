import { errorMessages, localMessages, statusCodes } from "@constants";
import { uploadImage } from "@utils";

export const createImagePublicUrl = async (
  _parent: undefined,
  args: { url: string }
): Promise<CreateImagePublicUrlOutputType> => {
  const USER_COVER_IMAGE_FOLDER = process.env.CLOUDINARY_IMAGE_FOLDER || "";
  const { PUBLIC_URL_SUCCESS } = localMessages.IMAGE;
  const { PUBLIC_URL_FAILED } = errorMessages.IMAGE;
  const errorData: CustomResponseType = {
    message: PUBLIC_URL_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
      const { url } = args;
      const { secureUrl } = await uploadImage(url, USER_COVER_IMAGE_FOLDER);      
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
