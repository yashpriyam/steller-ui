import { errorMessages, localMessages, statusCodes } from "@constants";
import { Goal } from "@models";

export const createNewGoal = async (
  parent: undefined,
  args: { input: IGoal }
): Promise<GoalOutputType | undefined> => {

  const {
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
  } = args.input;

  const { GOAL_CREATION_FAILED } = errorMessages.GOAL_MODEL;

  const { GOAL_CREATION_SUCCESS } = localMessages.GOAL_MODEL;
  const errorData: CustomResponseType = {
    message: GOAL_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };

  if (!title) {
    return { response: errorData };
  } 
 
  const newGoal = await Goal.create({
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
  })

  if (!newGoal) {
    return { response: errorData };
  }


  return {
    goal: newGoal,
    response: {
        status: statusCodes.OK,
        message: GOAL_CREATION_SUCCESS
    }
  };
};
