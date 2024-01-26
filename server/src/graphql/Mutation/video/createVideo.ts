import { videoModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
export const createVideo = async (
  parent: undefined,
  args: { videoData: CreateVideoType }
): Promise<VideoOutputDataType> => {
  const { VIDEO_CREATION_FAILED } = errorMessages.VIDEO_MODEL;
  const { VIDEO_CREATION_SUCCESS } = localMessages.VIDEO_MODEL;
  const errorData: CustomResponseType = {
    status: statusCodes.BAD_REQUEST,
    message: VIDEO_CREATION_FAILED,
  };
  try {
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
      weekNumber,
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
      weekNumber,
    });
    return createdVideoData
      ? {
          videoData: createdVideoData,
          response: {
            status: statusCodes.CREATED,
            message: VIDEO_CREATION_SUCCESS,
          },
        }
      : { response: errorData };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
