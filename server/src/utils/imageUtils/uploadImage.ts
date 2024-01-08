import { errorMessages } from "@constants";
import { UserInputError } from "apollo-server-express";

const cloudinary = require("cloudinary");

export const uploadImage = async ({
  images,
  folder,
}: UploadImageArgumentType) => {
  try {
    // Function to handle the upload of a single image
    const handleImage = async (image: string, folder: string) => {
      try {
        // Upload the image to Cloudinary
        const { public_id, secure_url } = await cloudinary.v2.uploader.upload(
          image,
          { folder }
        );
        return { public_id, secure_url };
      } catch (error) {
        throw new UserInputError(errorMessages.IMAGE.FAILED_TO_UPLOAD_IMAGE);
      }
    };

    // Create an array of upload tasks based on the input images
    const uploadTasks = Array.isArray(images)
      ? images.map((image) => handleImage(image, folder))
      : [handleImage(images, folder)];

    // Wait for all upload tasks to complete and collect their responses
    const responseArray = await Promise.all(uploadTasks);
    return responseArray;
  } catch (error) {
    throw new UserInputError(errorMessages.IMAGE.FAILED_TO_UPLOAD_IMAGE);
  }
};
