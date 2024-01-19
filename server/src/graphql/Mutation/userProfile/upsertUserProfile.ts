
import { userProfileModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";

export const upsertUserProfile = async (
    _parent: undefined,
    args: { data: UpsertUserProfileInputType },
    { contextData }: ContextType
): Promise<UpsertUserProfileOutputType> => {
    const { RESUME_UPSERT_SUCCESS } = localMessages.RESUME_MODEL;
    const { RESUME_UPSERT_FAILED } = errorMessages.RESUME_MODEL;

    const errorData: CustomResponseType = {
        message: RESUME_UPSERT_FAILED,
        status: statusCodes.BAD_REQUEST,
    };

    try {
        if (!isLoggedIn(contextData)) {
            return {
                response: getUnauthorizedResponse()
            }
        }
        const userId = contextData.user._id;

        const { data } = args;

        const { userProfile } = data || {}
        const userProfileData: UserProfileSchemaType | null = await userProfileModel.findOneAndUpdate({ userId }, { userId, ...userProfile }, { new: true, upsert: true });

        return {
            response: {
                message: RESUME_UPSERT_SUCCESS,
                status: statusCodes.OK,
            },
            userProfile: userProfileData,
        };
    } catch (error) {
        return {
            response: errorData,
        };
    }
};