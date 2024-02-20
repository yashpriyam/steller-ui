import { localMessages, errorMessages, statusCodes } from "@constants";
import {
  getSubFolderNameByKey,
  getUnauthorizedResponse,
  imageVariableKeys,
  isLoggedIn,
  updateImage,
  uploadImage,
} from "@utils";

import { User } from "../../../schema/userSchema";

export const updateCoverImage = async (
  _parent: undefined,
  args: { data: ImageInputType },
  { contextData }: ContextType
) => {
  if (!isLoggedIn(contextData)) {
    return getUnauthorizedResponse();
  }
  const { data } = args;
  const { image } = data;
  const { user } = contextData;
  const { _id: userId } = user;
  const { IMAGE_UPLOADED_SUCCESSFULLY } = localMessages.USER;
  const { UPLOAD_IMAGE_FAILED } = errorMessages.USER;
  const { VARIABLE_NOT_FOUND } = errorMessages.VARIABLE;
  const errorResponse: CustomResponseType = {
    message: UPLOAD_IMAGE_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    if (!image) {
      return errorResponse;
    }
    const folderName = await getSubFolderNameByKey(imageVariableKeys.profileImages);
    if (!folderName) return {
      response: {
        message: VARIABLE_NOT_FOUND,
        status:statusCodes.BAD_REQUEST,
      },
    }
    const response = user?.coverImage?.publicId
      ? await updateImage(
          image,
          folderName,
          user.coverImage.publicId
        )
      : await uploadImage(image, folderName);
    const { publicId, secureUrl } = response;
    await User.findByIdAndUpdate(
      userId,
      {
        coverImage: {
          publicId,
          secureUrl,
        },
      },
      { upsert: true, new: true }
    );
    return {
      CoverImageData: {
        publicId,
        secureUrl,
      },
      response: {
        status: statusCodes.OK,
        message: IMAGE_UPLOADED_SUCCESSFULLY,
      },
    };
  } catch (error) {
    return errorResponse;
  }
};
