import { errorMessages, localMessages, statusCodes } from "@constants";
import { tagsModel } from "@models";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";

export const createTag = async (
    _parent: undefined,
    args: { tagsInput: TagsSchemaType },
    { contextData }: ContextType
): Promise<CreateTagOutputType> => {
    const { TAG_CREATION_FAILED } = errorMessages.TAG;
    const errorData: CustomResponseType = {
        message: TAG_CREATION_FAILED,
        status: statusCodes.BAD_REQUEST,
    }
    try {
        if (!isLoggedIn(contextData)) {
            return { response: getUnauthorizedResponse() }
        }
        const { TAG_CREATION_SUCCESS } = localMessages.TAG;
        const { tagsInput } = args;
        const { tagKey, tagName, tagType, childrenTags } = tagsInput;
        const updatedChildrenTags = childrenTags?.map((child) => ({ ...child, parentTagKey: tagKey, parentTagType: tagType }))
        const tagData = await tagsModel.create({
            tagName,
            tagType,
            tagKey,
            childrenTags: updatedChildrenTags,
        })
        return tagData ? {
            tagData,
            response: {
                message: TAG_CREATION_SUCCESS,
                status: statusCodes.OK,
            }
        } : {
            response: errorData
        }
    } catch (error) {
        return {
            response: errorData
        }
    }
}