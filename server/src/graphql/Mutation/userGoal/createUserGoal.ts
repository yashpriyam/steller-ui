import { errorMessages, localMessages, statusCodes } from "@constants";
import { UserGoalCompletion } from "@models"; 
import { getUnauthorizedResponse, isLoggedIn } from "@utils";
import { getCurrentDate } from "@utils";

export const createUserGoalCompletion = async (
  parent: undefined,
  args: { input: UserGoalCompletion },
  { contextData }: ContextType
): Promise<UserGoalCompletionOutput | undefined> => {
    
  const {
    goalId,
    userResponse,
    weekNumber,
    isVerified= false
  } = args.input;

  const { USER_GOAL_COMPLETION_FAILED } = errorMessages.USER_GOAL_COMPLETION_MODEL;
  const { USER_GOAL_COMPLETION_SUCCESS } = localMessages.USER_GOAL_COMPLETION_MODEL;
  const errorData: CustomResponseType = {
    message: USER_GOAL_COMPLETION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  
  if (!isLoggedIn(contextData)) {
    return {
      response: getUnauthorizedResponse(),
    };
  }
  const userId = contextData.user._id;


  if (!userId || !goalId) {
    return { response: errorData };
  }

  try {
    const newUserGoalCompletion = await UserGoalCompletion.create({
      userId,
      goalId,
      completedAt: getCurrentDate(),
      userResponse,
      weekNumber,
      isVerified
    });

    if (!newUserGoalCompletion) {
      return { response: errorData };
    }

    return {
      userGoalCompletion: newUserGoalCompletion,
      response: {
        status: statusCodes.OK,
        message: USER_GOAL_COMPLETION_SUCCESS
      }
    };
  } catch (error) {
    console.error("Error creating user goal completion:", error);
    return { response: errorData };
  }
};
