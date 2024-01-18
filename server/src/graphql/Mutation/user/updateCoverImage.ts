import { localMessages, errorMessages, statusCodes } from "@constants";
import {
  getUnauthorizedResponse,
  isLoggedIn,
  updateImage,
  uploadImage,
} from "@utils";

import { User } from "../../../schema/userSchema";

export const updateCoverImage = async (
  _parent: undefined,
  args: { data: ImageInputType },
  { contextData }: ContextType
) => {
  if (!isLoggedIn(contextData)) {
    return getUnauthorizedResponse();
  }
  const { data } = args;
  const { image } = data;
  const USER_COVER_IMAGE_FOLDER = process.env.CLOUDINARY_IMAGE_FOLDER || "";
  const { user } = contextData;
  const { _id: userId } = user;
  const { IMAGE_UPLOADED_SUCCESSFULLY } = localMessages.USER;
  const { UPLOAD_IMAGE_FAILED } = errorMessages.USER;
  const errorResponse: CustomResponseType = {
    message: UPLOAD_IMAGE_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    if (!image) {
      return errorResponse;
    }
    const response = user?.coverImage?.publicId
      ? await updateImage(
          image,
          USER_COVER_IMAGE_FOLDER,
          user.coverImage.publicId
        )
      : await uploadImage(image, USER_COVER_IMAGE_FOLDER);
    const { publicId, secureUrl } = response;
    await User.findByIdAndUpdate(
      userId,
      {
        coverImage: {
          publicId,
          secureUrl,
        },
      },
      { upsert: true, new: true }
    );
    return {
      CoverImageData: {
        publicId,
        secureUrl,
      },
      response: {
        status: statusCodes.OK,
        message: IMAGE_UPLOADED_SUCCESSFULLY,
      },
    };
  } catch (error) {
    return errorResponse;
  }
};
