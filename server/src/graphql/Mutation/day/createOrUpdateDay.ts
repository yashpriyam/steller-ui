import { dayModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const createOrUpdateDay = async (
  parent: undefined,
  args: { dayData: CreateOrUpdateDayDataType }
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
        videos
    } = dayData;
    const newDayData: DayDataType = await dayModel.findOneAndUpdate(
      { dayNumber },
      {
        dayNumber,
        description,
        notes,
        questions,
        title,
        topics,
        videos,
      },
      { new: true, upsert: true }
    );
    return {
      dayData: newDayData,
      response: newDayData
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