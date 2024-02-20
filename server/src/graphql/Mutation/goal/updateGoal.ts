import { errorMessages, localMessages, statusCodes } from "@constants";
import { Goal } from "@models";

export const updateGoal = async (
    parent: undefined,
    args: { id: string, input: Goal }
  ): Promise<GoalOutputType | undefined> => {
  
    const {
      id,
      input: {
        batchCode,
        title,
        dependedOn,
        endWeek,
        frequency,
        description,
        goalType,
        isActive,
        isAutomated,
        isMandatory,
        questionList,
        startWeek,
        topicList,
      }
    } = args;
  
    const { GOAL_UPDATE_FAILED } = errorMessages.GOAL_MODEL;
    const { GOAL_UPDATE_SUCCESS } = localMessages.GOAL_MODEL;
  
    const errorData: CustomResponseType = {
      message: GOAL_UPDATE_FAILED,
      status: statusCodes.BAD_REQUEST,
    };
  
    if (!id) {
      return { response: errorData };
    }
  
    try {
      const updatedGoal = await Goal.findByIdAndUpdate(id, {
        $set: {
          batchCode,
          title,
          dependedOn,
          endWeek,
          frequency,
          description,
          goalType,
          isActive,
          isAutomated,
          isMandatory,
          questionList,
          startWeek,
          topicList,
        }
      }, { new: true });

  
      if (!updatedGoal) {
        return { response: errorData };
      }
  
      return {
        goal: updatedGoal,
        response: {
          status: statusCodes.OK,
          message: GOAL_UPDATE_SUCCESS
        }
      };
    } catch (error) {
      console.error("Error updating goal:", error);
      return { response: errorData };
    }
  };
  