import { errorMessages } from "@constants";
import { deleteImage, getImage, uploadImage } from "@utils";
import { UserInputError } from "apollo-server-express";

interface ImageUploadArgs {
  image: string;
}

const USER_PROFILE_PICTURES_FOLDER = "Web Masters/Profile Pictures";

export const updateProfilePicture = async (
  _: undefined,
  { image }: ImageUploadArgs
) => {
  try {
    if (!image) {
      throw new UserInputError(errorMessages.USER.INVALID_USER_PROFILE_IMAGE);
    }

    const response = await uploadImage({
      images: image,
      folder: USER_PROFILE_PICTURES_FOLDER,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};