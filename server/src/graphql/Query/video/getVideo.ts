import { videoModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { removeNullKeys } from "@utils";

export const getVideo = async (
    parent: undefined,
    args: { videoDataFilter: VideoDataType }
): Promise<VideoOutputDataType | void> => {
    const { VIDEO_NOT_FOUND } = errorMessages.VIDEO_MODEL;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: VIDEO_NOT_FOUND,
    };
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
        let modifiedVideoDataFilter = removeNullKeys({
            links,
            videoNumber,
            topics,
            title,
            isActive,
            duration,
            description,
            dayNumber,
        });

        if (links) {
            const filteredLinks = removeNullKeys(links);
            const updatedLinks = Object.keys(filteredLinks).reduce(
                (acc: any, key) => {
                    acc[`links.${key}`] = filteredLinks[key];
                    return acc;
                },
                {}
            );
            if (updatedLinks) {
                const { links, ...restFilters } = modifiedVideoDataFilter;
                modifiedVideoDataFilter = { ...restFilters, ...updatedLinks };
            }
        }
        if (!Object.keys(modifiedVideoDataFilter).length) {
            return {
                response: errorData,
            };
        }

        Object.entries(modifiedVideoDataFilter).forEach(([key, value]) => {
            if (key === "topics") {
                modifiedVideoDataFilter[key] = { $in: value };
            }
        });
        const filteredVideoData = await videoModel.findOne(modifiedVideoDataFilter);
        return {
            videoData: filteredVideoData,
            response: filteredVideoData
                ? {
                    status: statusCodes.OK,
                    message: VIDEO_FOUND,
                }
                : errorData,
        };
    } catch (err) {
        return {
            response: errorData,
        };
    }
};
