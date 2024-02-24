import { errorMessages, localMessages, statusCodes } from "@constants";
import { UserGoalCompletion } from "@models";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";

export const updateUserGoalCompletion = async (
  parent: undefined,
  args: { input:{ id: string, response?: JSON }},
  { contextData }: ContextType
): Promise<UserGoalCompletionOutput | undefined> => {
  const { id, response } = args.input;

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

  try {
    const updatedUserGoalCompletion = await UserGoalCompletion.findByIdAndUpdate(
      id,
      { $set: {
        userResponse: response
      } },
      { new: true }
    );

    if (!updatedUserGoalCompletion) {
      return { response: errorData };
    }

    return {
      userGoalCompletion: updatedUserGoalCompletion,
      response: {
        status: statusCodes.OK,
        message: USER_GOAL_COMPLETION_UPDATE_SUCCESS
      }
    };
  } catch (error) {
    console.error("Error updating user goal completion:", error);
    return { response: errorData };
  }
};
