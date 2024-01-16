import { dayModel, weekModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const createDay = async (
  parent: undefined,
  args: { dayData: DaySchemaType }
): Promise<DayDataOutputType> => {
  const { DAY_CREATION_FAILED } = errorMessages.DAY_MODEL;
  const errorData: CustomResponseType = {
    message: DAY_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const {
      DAY_CREATION_SUCCESS,
      WEEK_DOES_NOT_EXIST_TO_INSERT_DAY,
      DAY_EXIST,
    } = localMessages.DAY_MODEL;
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
    if (!weekNumber || !batchCode || !dayNumber) return { response: errorData };
    const existingWeekData = await weekModel.findOne({
      weekNumber,
      batchCode,
    });
    if (!existingWeekData)
      return {
        response: {
          message: WEEK_DOES_NOT_EXIST_TO_INSERT_DAY,
          status: statusCodes.BAD_REQUEST,
        },
      };
    const existingDayData = await dayModel.findOne({
      batchCode,
      weekNumber,
      dayNumber,
    });
    if (existingDayData)
      return {
        response: {
          message: DAY_EXIST,
          status: statusCodes.BAD_REQUEST,
        },
      };
    const newDayData = await dayModel.create({
      dayNumber,
      description,
      notes,
      questions,
      title,
      topics,
      videos,
      weekNumber,
      batchCode,
    });
    existingWeekData.days?.push(newDayData._id);
    await existingWeekData.save();
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
