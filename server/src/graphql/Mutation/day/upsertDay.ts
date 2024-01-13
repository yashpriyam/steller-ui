import { dayModel, weekModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const upsertDay = async (
  parent: undefined,
  args: { dayData: CreateDayDataType }
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
    let newDayData: CreateDayDataType = await dayModel.findOneAndUpdate(
      { weekNumber, dayNumber },
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
    console.log({ newDayData });
    if (newDayData) {
      const newWeekData: WeekSchemaType | null =
        await weekModel.findOneAndUpdate(
          { weekNumber },
          {
            $push: { days: newDayData._id },
          },
          { new: true, upsert: true }
        );
      console.log({ newWeekData });
    }
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
    console.log(err)
    return {
      response: errorData,
    };
  }
};
