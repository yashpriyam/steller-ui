import cloudinary from "cloudinary";
import { errorMessages } from "@constants";
import { UserInputError } from "apollo-server-express";

export const uploadImage = async (image: string, folder: string): Promise<UploadImageReturnType> => {
  try {
    const { public_id: publicId, secure_url: secureUrl } = await cloudinary.v2.uploader.upload(
      image,
      { folder }
    );
    return { publicId, secureUrl };
  } catch (error) {
    throw new UserInputError(errorMessages.IMAGE.FAILED_TO_UPLOAD_IMAGE);
  }
};
