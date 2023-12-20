import { ObjectId } from "mongoose";
import { videoModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const deleteVideoById = async (
  parent: undefined,
  args: { videoId: ObjectId }
): Promise<VideoOutputDataType | void> => {
  const { VIDEO_DELETION_FAILED } = errorMessages.VIDEO_MODEL;
  const errorData: CustomResponseType = {
    status: statusCodes.BAD_REQUEST,
    message: VIDEO_DELETION_FAILED,
  };
  try {
    const { VIDEO_DELETION_SUCCESS } = localMessages.VIDEO_MODEL;
    const { videoId } = args;
    const deletedVideoData = await videoModel.findByIdAndDelete(videoId);
    return {
      videoData: deletedVideoData,
      response: deletedVideoData
        ? {
          status: statusCodes.OK,
          message: VIDEO_DELETION_SUCCESS,
        }
        : errorData,
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
