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

export const updateProfilePicture = async (
  _: undefined,
  { image }: ImageUploadArgs,
  { contextData }: ContextType
) => {
  if (!isLoggedIn(contextData)) {
    return getUnauthorizedResponse();
  }
  const userData = contextData.user;
  const userId = userData._id;
  const errorResponse = {
    response: {
      message: errorMessages.USER.UPLOAD_IMAGE_FAILED,
      status: statusCodes.BAD_REQUEST,
    },
  };
  const { VARIABLE_NOT_FOUND } = errorMessages.VARIABLE;
  try {
    if (!image) {
      return errorResponse;
    }
    const PROFILE_IMAGE_FOLDER = await getSubFolderNameByKey(imageVariableKeys.profileImages);
    if (!PROFILE_IMAGE_FOLDER) return {
      response: {
        message: VARIABLE_NOT_FOUND,
        status:statusCodes.BAD_REQUEST,
      },
    }
    const response = userData?.profileImage?.publicId
      ? await updateImage(
          image,
          PROFILE_IMAGE_FOLDER,
          userData.profileImage.publicId
        )
      : await uploadImage(image, PROFILE_IMAGE_FOLDER);

    const { publicId, secureUrl } = response;

    await User.findByIdAndUpdate(
      userId,
      {
        profileImage: {
          publicId,
          secureUrl,
        },
      },
      { new: true }
    );
    return {
      profileImage: {
        publicId,
        secureUrl,
      },
      response: {
        status: statusCodes.OK,
        message: localMessages.USER.PROFILE_IMAGE_UPLOADED,
      },
    };
  } catch (error) {
    return errorResponse;
  }
};
