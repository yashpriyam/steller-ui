import { errorMessages, localMessages, statusCodes } from "@constants";
import { User, UserGoalCompletion } from "@models";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";

export const updateUserGoalCompletion = async (
  parent: undefined,
  args: { input:{ id: string, response?: JSON, profileType?: string }},
  { contextData }: ContextType
): Promise<UserGoalCompletionOutput | undefined> => {
  const { id, response,profileType } = args.input;

  const { USER_GOAL_COMPLETION_UPDATE_FAILED } = errorMessages.USER_GOAL_COMPLETION_MODEL;
  const { USER_GOAL_COMPLETION_UPDATE_SUCCESS } = localMessages.USER_GOAL_COMPLETION_MODEL;
  const errorData: CustomResponseType = {
    message: USER_GOAL_COMPLETION_UPDATE_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  
  if (!isLoggedIn(contextData)) {
    return {
      response: getUnauthorizedResponse(),
    };
  }

  if (!response) {
    return { response: errorData };
  }

  const userId = contextData.user._id;

  if (!userId || !id) {
    return { response: errorData };
  }
  try {
    const updatedUserGoalCompletion =
      await UserGoalCompletion.findByIdAndUpdate(
        id,
        {
          $set: {
            userResponse: response,
          },
        },
        { new: true }
      );

    if (!updatedUserGoalCompletion) {
      return { response: errorData };
    }

    if (profileType) {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          socialLinks: {
            [profileType]: updatedUserGoalCompletion?.userResponse
          },
        }
      );
    }

    return {
      userGoalCompletion: updatedUserGoalCompletion,
      response: {
        status: statusCodes.OK,
        message: USER_GOAL_COMPLETION_UPDATE_SUCCESS,
      },
    };
  } catch (error) {
    console.error("Error updating user goal completion:", error);
    return { response: errorData };
  }
};
