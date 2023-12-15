import { ObjectId } from "mongoose";
import { videoModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { removeNullKeys } from "@utils";

export const updateVideoById = async (
  parent: undefined,
  args: { videoId: ObjectId; videoData: VideoDataType }
): Promise<VideoOutputDataType | void> => {
  const { VIDEO_UPDATION_FAILED } = errorMessages.VIDEO_MODEL;
  try {
    const { VIDEO_UPDATION_SUCCESS } = localMessages.VIDEO_MODEL;
    const { videoId, videoData } = args;
    const {
      videoNumber,
      topics,
      title,
      isActive,
      duration,
      description,
      links,
      dayNumber,
    }: VideoDataType = videoData;

    let updateObj = links ?? {};
    if (links) {
      const filteredLinks = removeNullKeys(links);
      updateObj = Object.keys(filteredLinks).reduce((acc: any, key) => {
        acc[`links.${key}`] = filteredLinks[key];
        return acc;
      }, {});
    }

    const updatedVideoData: VideoDataType = await videoModel.findByIdAndUpdate(
      videoId,
      {
        $set: updateObj, //this is links field
        videoNumber,
        topics,
        title,
        isActive,
        duration,
        description,
        dayNumber,
      },
      { new: true }
    );

    return {
      videoData: updatedVideoData,
      response: {
        status: statusCodes.OK,
        message: updatedVideoData
          ? VIDEO_UPDATION_SUCCESS
          : VIDEO_UPDATION_FAILED,
      },
    };
  } catch (err) {
    return {
      response: {
        status: statusCodes.BAD_REQUEST,
        message: VIDEO_UPDATION_FAILED,
      },
    };
  }
};
