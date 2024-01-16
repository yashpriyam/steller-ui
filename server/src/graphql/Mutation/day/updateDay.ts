import { dayModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const updateDay = async (
  parent: undefined,
  args: { dayData: DaySchemaType }
): Promise<DayDataOutputType> => {
  const { DAY_UPDATION_FAILED } = errorMessages.DAY_MODEL;
  const errorData: CustomResponseType = {
    message: DAY_UPDATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { DAY_UPDATION_SUCCESS } = localMessages.DAY_MODEL;
    const { dayData } = args;
    const { dayNumber, description, title, topics, weekNumber, batchCode } =
      dayData;
    if (!weekNumber || !batchCode || !dayNumber) return { response: errorData };
    const updatedDayData = await dayModel.findOneAndUpdate(
      { batchCode, weekNumber, dayNumber },
      {
        dayNumber,
        description,
        title,
        topics,
        weekNumber,
        batchCode,
      },
      { new: true }
    );
    return updatedDayData
      ? {
          dayData: updatedDayData,
          response: {
            message: DAY_UPDATION_SUCCESS,
            status: statusCodes.OK,
          },
        }
      : {
          response: errorData,
        };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};