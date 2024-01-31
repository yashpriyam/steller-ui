import { User } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { getUnauthorizedResponse, isAdmin, isLoggedIn } from "@utils";

export const getUser = async (
  parent: undefined,
  args: undefined,
  { contextData }: ContextType
): Promise<UserDataOutputType | unknown> => {
  const { USER_FETCH_FAILED } = errorMessages.USER;
  const errorData: CustomResponseType = {
    message: USER_FETCH_FAILED,
    status: statusCodes.NOT_FOUND,
  };

  try {
    if (!isLoggedIn(contextData)) {
      return {
        response: getUnauthorizedResponse(),
      };
    }

    const userId = contextData.user._id;

    // Validate required input fields
    if (!userId) return { response: errorData };

    // Fetch user information
    const userData = await User.findById(userId);

    // check user is admin or not

    const isAdminUser = await isAdmin(userData?.email ?? '')

    return {
      userData: userData,
      isAdmin: isAdminUser,
      response: userData
        ? {
            message: localMessages.USER.USER_FETCH_SUCCESS,
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
