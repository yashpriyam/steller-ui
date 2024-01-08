import { errorMessages } from "@constants";
import { UserInputError } from "apollo-server-express";

const cloudinary = require("cloudinary");

export const deleteImage = async (publicId: string | []) => {
  try {
    const result = await cloudinary.v2.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new UserInputError(errorMessages.IMAGE.FAILED_TO_DELETE_IMAGE);
  }
};