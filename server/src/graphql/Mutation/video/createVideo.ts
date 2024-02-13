import { dayModel, videoModel } from "@models";
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
      thumbnailImage
    } = videoData;
    const { youtube, webmasters } = links;
   
    const dayResponse = await dayModel.findOne({weekNumber, dayNumber, batchCode})

    if (!dayResponse) {
      return {response: {
          message: localMessages.DAY_MODEL.WEEK_DOES_NOT_EXIST_TO_INSERT_DAY,
          status: statusCodes.BAD_REQUEST
      }}
  }

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
      thumbnailImage
    });

     if (!createdVideoData) {
       return { response: errorData }
     }

     dayResponse.videos?.push(createdVideoData._id!)
     await dayResponse.save()

    return {
          videoData: createdVideoData,
          response: {
            status: statusCodes.CREATED,
            message: VIDEO_CREATION_SUCCESS,
          },
        };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
