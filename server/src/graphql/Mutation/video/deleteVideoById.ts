import { ObjectId } from "mongoose";
import { videoModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const deleteVideoById = async (
  parent: undefined,
  args: { videoId: ObjectId }
): Promise<VideoOutputDataType | void> => {
  const { VIDEO_DELETION_FAILED } = errorMessages.VIDEO_MODEL;
  try {
    const { VIDEO_DELETION_SUCCESS } = localMessages.VIDEO_MODEL;
    const { videoId } = args;
    const deletedVideoData = await videoModel.findByIdAndDelete(videoId);
    return {
      videoData: deletedVideoData,
      response: {
        status: statusCodes.OK,
        message: deletedVideoData
          ? VIDEO_DELETION_SUCCESS
          : VIDEO_DELETION_FAILED,
      },
    };
  } catch (err) {
    return {
      response: {
        status: statusCodes.BAD_REQUEST,
        message: VIDEO_DELETION_FAILED,
      },
    };
  }
};
