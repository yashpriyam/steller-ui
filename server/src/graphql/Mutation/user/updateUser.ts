import { User } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";

export const updateUser = async (
  parent: undefined,
  args: { input: Partial<UserSchemaType> },
  { contextData }: ContextType
): Promise<UserDataOutputType | unknown> => {
  const { USER_UPDATE_FAILED } = errorMessages.USER;
  const errorData: CustomResponseType = {
    message: USER_UPDATE_FAILED,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    const { input } = args;

    if (!isLoggedIn(contextData)) {
      return {
        response: getUnauthorizedResponse(),
      };
    }
    const userId = contextData.user._id;

    // Validate required input fields
    if (!userId) return { response: errorData };

    // Update the user information excluding the image
    const updatedUserData = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { ...input, profileImage: undefined, coverImage: undefined } },
      { new: true }
    );

    return {
      userData: updatedUserData,
      response: updatedUserData
        ? {
            message: localMessages.USER.USER_UPDATE_SUCCESS,
            status: statusCodes.OK,
          }
        : errorData,
    };
  } catch (err) {
    console.error(err);
    return {
      response: errorData,
    };
  }
};
