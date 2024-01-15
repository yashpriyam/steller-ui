import { localMessages, errorMessages, statusCodes } from "@constants";
import {
  deleteImage,
  getImage,
  getUnauthorizedResponse,
  isLoggedIn,
  updateImage,
  uploadImage,
} from "@utils";
import { UserInputError } from "apollo-server-express";
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

  try {
    if (!image) {
      throw new UserInputError(errorMessages.USER.INVALID_USER_PROFILE_IMAGE);
    }
    
    const response =  userData?.profileImage?.publicId 
    ? await updateImage(image, USER_PROFILE_PICTURES_FOLDER, userData.profileImage.publicId)
    : await uploadImage(image, USER_PROFILE_PICTURES_FOLDER);

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
    return response;
  } catch (error) {
    return {
    message: errorMessages.USER.UPLOAD_IMAGE_FAILED,
    status: statusCodes.BAD_REQUEST
    }
  }
};
