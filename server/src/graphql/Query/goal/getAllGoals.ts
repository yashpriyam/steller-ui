import { errorMessages, localMessages, statusCodes } from "@constants";
import { Goal } from "@models";

export const getAllGoals = async (): Promise<GoalsOutputType> => {
    try {
      const goals = await Goal.find().populate("startWeek endWeek goalType");
      
      
      return {
        goals,
        response: {
          status: statusCodes.OK,
          message: localMessages.GOAL_MODEL.GOAL_FETCH_SUCCESS
        }
      };
    } catch (error) {
      console.error("Error fetching goals:", error);
      return {
        response: {
          status: statusCodes.INTERNAL_SERVER_ERROR,
          message: errorMessages.GOAL_MODEL.GOAL_FETCH_FAILED
        }
      };
    }
  };
  