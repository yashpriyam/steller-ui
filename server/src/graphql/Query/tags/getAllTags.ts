import { errorMessages, localMessages, statusCodes } from "@constants";
import { tagsModel } from "@models";
import { removeNullAndUndefinedKeys } from "@utils";

export const getAllTags = async (
    _parent: undefined,
    args: { filter: TagsSchemaType }
): Promise<AllTagOutputType> => {
    const { TAG_FETCH_FAILED } = errorMessages.TAG;
    const errorData: CustomResponseType = {
        message: TAG_FETCH_FAILED,
        status: statusCodes.BAD_REQUEST,
    };
    try {
        const { TAG_FETCH_SUCCESS } = localMessages.TAG;
        const { filter } = args;
        let modifiedFilter = {};
        if (filter) modifiedFilter = removeNullAndUndefinedKeys(filter);
        const tagList = await tagsModel.find(modifiedFilter);
        if(!tagList.length) return { response : errorData };
        const tagData: Record<string, TagsSchemaType[]> = {};
        tagList.forEach((val: TagsSchemaType) => {
            const key = val.tagType;
            if (key) {
                (tagData[key]) ? tagData[key].push(val) : tagData[key] = [val];
            }
        })
        return {
                tagData,
                response: {
                    message: TAG_FETCH_SUCCESS,
                    status: statusCodes.OK,
                },
            }
    } catch (error) {
        return {
            response: errorData,
        };
    }
};
