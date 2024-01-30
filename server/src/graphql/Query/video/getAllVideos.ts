import { errorMessages, localMessages, statusCodes } from "@constants";
import { videoModel } from "@models";
import { removeNullAndUndefinedKeys } from "@utils";

export const getAllVideos = async (
    parent: undefined,
    args: { videoDataFilter: VideoDataType }
): Promise<AllVideoOutputDataType | unknown> => {
    const { VIDEO_NOT_FOUND } = errorMessages.VIDEO_MODEL;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: VIDEO_NOT_FOUND,
    }
    try {
        const { VIDEO_FOUND } = localMessages.VIDEO_MODEL;
        const { videoDataFilter } = args;
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
        let modifiedVideoDataFilter = removeNullAndUndefinedKeys({
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
            const filteredLinks = removeNullAndUndefinedKeys(links);
            const updatedLinks = Object.keys(filteredLinks).reduce(
                (acc: FilteredLinksType, key) => {
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
        Object.entries(modifiedVideoDataFilter).forEach(([key, value]) => {
            if (key === localMessages.TOPICS) {
                modifiedVideoDataFilter[key] = { $in: value };
            }
        });
        const filteredVideoData:VideoDataType[] = await videoModel.find(modifiedVideoDataFilter);
        

        return filteredVideoData.length ? {
            videoData: filteredVideoData,
            response:{
                status: statusCodes.OK,
                message: VIDEO_FOUND,
            }
          }:{
            response:errorData
          }        
    } catch (err) {
        return {
            response: errorData,
        };
    }
};