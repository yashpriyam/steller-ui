import { videoModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { removeNullKeys } from "@utils";

export const getVideo = async (
    parent: undefined,
    args: { videoDataFilter: VideoDataType }
): Promise<VideoOutputDataType | void> => {
    const { VIDEO_NOT_FOUND, BAD_USER_INPUT } = errorMessages.VIDEO_MODEL;
    try {
        const { videoDataFilter } = args;
        const { VIDEO_FOUND } = localMessages.VIDEO_MODEL;
        const {
            links,
            videoNumber,
            topics,
            title,
            isActive,
            duration,
            description,
            dayNumber,
        }: VideoDataType = videoDataFilter;
        const { youtube, webmasters } = links ?? {};
        console.log({ videoDataFilter })
        const modifiedVideoDataFilter: object = removeNullKeys({
            links,
            videoNumber,
            topics,
            title,
            isActive,
            duration,
            description,
            dayNumber,
        });
        console.log({ modifiedVideoDataFilter });
        console.log(Object.keys(modifiedVideoDataFilter).length);

        if (!Object.keys(modifiedVideoDataFilter).length) {
            return {
                response: {
                    status: statusCodes.OK,
                    message: BAD_USER_INPUT,
                },
            };
        }

        const filteredVideoData = await videoModel.findOne(modifiedVideoDataFilter);
        console.log({ filteredVideoData });

        return {
            videoData: filteredVideoData,
            response: {
                status: statusCodes.OK,
                message: filteredVideoData ? VIDEO_FOUND : VIDEO_NOT_FOUND,
            },
        };
    } catch (err) {
        console.log({ err })
        return {
            response: {
                status: statusCodes.BAD_REQUEST,
                message: VIDEO_NOT_FOUND,
            },
        };
    }
};
