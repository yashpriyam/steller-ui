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
    const { dayNumber, description, title, topics, weekNumber, batchCode, date } =
      dayData;
    if (!weekNumber || !batchCode || !dayNumber || !date) {
      return {
        response: {
          status: statusCodes.BAD_REQUEST,
          message: errorMessages.DAY_MODEL.DAY_MODEL_REQUIRED_FIELDS,
        },
      };
    } else {
      const updatedDayData = await dayModel.findOneAndUpdate(
        { batchCode, weekNumber, dayNumber },
        {
          dayNumber,
          description,
          title,
          topics,
          weekNumber,
          batchCode,
          date
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
    }
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
