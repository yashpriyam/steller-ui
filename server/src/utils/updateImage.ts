import cloudinary from "cloudinary";
import { errorMessages } from "@constants";
import { UserInputError } from "apollo-server-express";

export const updateImage = async (
  image: string,
  folder: string,
  publicId: string
): Promise<UploadImageReturnType> => {
  try {
    const { secure_url: secureUrl } = await cloudinary.v2.uploader.upload(
      image,
      {
        folder,
        public_id: publicId,
      }
    );
    return { publicId, secureUrl };
  } catch (error) {
    throw new UserInputError(errorMessages.IMAGE.FAILED_TO_UPLOAD_IMAGE);
  }
};