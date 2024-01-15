import { errorMessages } from "@constants";
import { UserInputError } from "apollo-server-express";
import { uploadImage } from "./uploadImage";

export const uploadImageList = async ({
  images,
  folder,
}: UploadImageListArgumentType) => {
  try {
    const uploadTasks = images.map((image) => uploadImage(image, folder));
    const responseArray = await Promise.all(uploadTasks);
    return responseArray;
  } catch (error) {
    throw new UserInputError(errorMessages.IMAGE.FAILED_TO_UPLOAD_IMAGE);
  }
};
