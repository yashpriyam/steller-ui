import { errorMessages } from "@constants";
import { UserInputError } from "apollo-server-express";

const cloudinary = require("cloudinary");

export const getImage = async (publicId: string) => {
  try {
    const result = await cloudinary.v2.api.resource(publicId);
    return result;
  } catch (error) {
    throw new UserInputError(errorMessages.IMAGE.NO_IMAGE_FOUND_WITH_PUBLIC_ID);
  }
};