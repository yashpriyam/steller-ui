import { errorMessages } from "@constants";
import { UserInputError } from "apollo-server-express";

const cloudinary = require("cloudinary");

interface UploadImageArgumentType {
  images: string | string[];
  folder: string;
}

export const uploadImage = async ({
  images,
  folder,
}: UploadImageArgumentType) => {
  try {
    const handleImage = async (image: string, folder: string) => {
      try {
        const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
          image,
          { folder }
        );
        return { public_id, secure_url };
      } catch (error) {
        throw new UserInputError(errorMessages.IMAGE.FAILED_TO_UPLOAD_IMAGE);
      }
    };

    const uploadTasks = Array.isArray(images)
      ? images.map((image) => handleImage(image, folder))
      : [handleImage(images, folder)];

    const responseArray = await Promise.all(uploadTasks);
    return responseArray;
  } catch (error) {
    throw new UserInputError(errorMessages.IMAGE.FAILED_TO_UPLOAD_IMAGE);   
  }
};