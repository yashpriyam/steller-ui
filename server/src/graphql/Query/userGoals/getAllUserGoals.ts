import { errorMessages, localMessages, statusCodes } from "@constants";
import { UserGoalCompletion } from "@models";
import { getUnauthorizedResponse, isLoggedIn } from "@utils";
import mongoose from "mongoose";

export const getAllUserGoals = async (
  parent: undefined,
  args: undefined,
  { contextData }: ContextType
): Promise<UserGoalsOutputType> => {
  try {
    if (!isLoggedIn(contextData)) {
      return {
        response: getUnauthorizedResponse(),
      };
    }

    const userId = contextData.user._id;

    const goals = await UserGoalCompletion.find({ userId });

    return {
      userGoals: goals,
      response: {
        status: statusCodes.OK,
        message: localMessages.GOAL_MODEL.GOAL_FETCH_SUCCESS,
      },
    };
  } catch (error) {
    console.error("Error fetching goals:", error);
    return {
      response: {
        status: statusCodes.INTERNAL_SERVER_ERROR,
        message: errorMessages.GOAL_MODEL.GOAL_FETCH_FAILED,
      },
    };
  }
};
