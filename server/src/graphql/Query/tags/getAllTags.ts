import { errorMessages, localMessages, statusCodes } from "@constants";
import { tagsModel } from "@models";
import { removeNullAndUndefinedKeys } from "@utils";

export const getAllTags = async (
    _parent: undefined,
    args: { filter: TagsSchemaType }
): Promise<CreateTagOutputType | unknown> => {
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
        const tagData = await tagsModel.find({ ...modifiedFilter });
        return tagData.length
            ? {
                tagData,
                response: {
                    message: TAG_FETCH_SUCCESS,
                    status: statusCodes.OK,
                },
            }
            : {
                response: errorData,
            };
    } catch (error) {
        return {
            response: errorData,
        };
    }
};
