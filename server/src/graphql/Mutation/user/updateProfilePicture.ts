import { localMessages, errorMessages, statusCodes } from "@constants";
import {
  getUnauthorizedResponse,
  getVariableValuesByKey,
  imageVariableKeys,
  isLoggedIn,
  updateImage,
  uploadImage,
} from "@utils";

import { User } from "../../../schema/userSchema";

const USER_PROFILE_PICTURES_FOLDER = process.env.CLOUDINARY_IMAGE_FOLDER || "";

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
    const baseFolderName = await getVariableValuesByKey(imageVariableKeys.cloudinaryBaseFolder)
    const subFolderName = await getVariableValuesByKey(imageVariableKeys.profileImages)
    if (!subFolderName || !baseFolderName) return {
      response: {
        message: VARIABLE_NOT_FOUND,
        status:statusCodes.BAD_REQUEST,
      },
    }
    const imageFolderName = `${baseFolderName?.value[0]}/${subFolderName?.value[0]}`
    const response = userData?.profileImage?.publicId
      ? await updateImage(
          image,
          imageFolderName,
          userData.profileImage.publicId
        )
      : await uploadImage(image, imageFolderName);

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
