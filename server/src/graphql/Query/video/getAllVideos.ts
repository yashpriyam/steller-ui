import { errorMessages, localMessages, statusCodes } from "@constants";
import { videoModel } from "@models";
import { removeNullKeys } from "@utils";

export const getAllVideos = async (
    parent: undefined,
    args: { videoDataFilter: VideoDataType }
): Promise<AllVideoOutputDataType | void> => {
    const { VIDEO_NOT_FOUND } = errorMessages.VIDEO_MODEL;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: VIDEO_NOT_FOUND,
    }
    try {
        const { VIDEO_FOUND } = localMessages.VIDEO_MODEL;
        const { videoDataFilter } = args;
        const modifiedVideoDataFilter: Record<string, unknown> = removeNullKeys(videoDataFilter);

        Object.entries(modifiedVideoDataFilter).forEach(([key, value]) => {
            if (key === "topics") {
                modifiedVideoDataFilter[key] = { $in: value };
            }
        });
        const deletedVideoData = await videoModel.find(modifiedVideoDataFilter);
        return {
            videoData: deletedVideoData,
            response: deletedVideoData ? {
                status: statusCodes.OK,
                message: VIDEO_FOUND,
            } : errorData,
        };
    } catch (err) {
        return {
            response: errorData,
        };
    }
};