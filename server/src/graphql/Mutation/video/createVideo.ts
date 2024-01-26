import { videoModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
export const createVideo = async (
  parent: undefined,
  args: { videoData: CreateVideoType }
): Promise<VideoOutputDataType> => {
  try {
    const { VIDEO_CREATION_SUCCESS } = localMessages.VIDEO_MODEL;
    const { videoData } = args;
    const {
      title,
      description,
      dayNumber,
      videoNumber,
      topics,
      links,
      isActive,
      duration,
      batchCode,
      weekNumber
    } = videoData;
    const { youtube, webmasters } = links;
    const createdVideoData: VideoDataType = await videoModel.create({
      title,
      description,
      dayNumber,
      videoNumber,
      topics,
      links: {
        youtube,
        webmasters,
      },
      isActive,
      duration,
      batchCode,
      weekNumber
    });

    return {
      videoData: createdVideoData,
      response: {
        status: statusCodes.OK,
        message: VIDEO_CREATION_SUCCESS,
      },
    };
  } catch (err) {
    const { VIDEO_CREATION_FAILED } = errorMessages.VIDEO_MODEL;
    return {
      response: {
        status: statusCodes.BAD_REQUEST,
        message: VIDEO_CREATION_FAILED,
      },
    };
  }
};
