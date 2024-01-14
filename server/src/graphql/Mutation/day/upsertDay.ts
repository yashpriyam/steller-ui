import { dayModel, weekModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const upsertDay = async (
  parent: undefined,
  args: { dayData: DayDataType }
): Promise<DayDataOutputType> => {
  const { DAY_CREATION_FAILED } = errorMessages.DAY_MODEL;
  const errorData: CustomResponseType = {
    message: DAY_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { DAY_CREATION_SUCCESS } = localMessages.DAY_MODEL;
    const { dayData } = args;
    const {
      dayNumber,
      description,
      notes,
      questions,
      title,
      topics,
      videos,
      weekNumber,
      batchCode,
    } = dayData;
    if(!dayNumber || !weekNumber || !batchCode) {
      return{
        response:errorData,
      }
    }
    const updatedDayData: DayDataType = await dayModel.findOneAndUpdate(
      { batchCode, weekNumber, dayNumber },
      {
        dayNumber,
        description,
        notes,
        questions,
        title,
        topics,
        videos,
        weekNumber,
        batchCode,
      },
      { new: true, upsert: true }
    );
    if (updatedDayData) {
        await weekModel.findOneAndUpdate(
          { weekNumber },
          {
            $push: { days: updatedDayData._id },
          },
          { new: true, upsert: true }
        );
    }
    return {
      dayData: updatedDayData,
      response: updatedDayData
        ? {
          message: DAY_CREATION_SUCCESS,
          status: statusCodes.OK,
        }
        : errorData,
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
