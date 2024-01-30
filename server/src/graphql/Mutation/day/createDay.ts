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
      date,
    } = dayData;
    if (!weekNumber || !batchCode || !dayNumber || !date) {
      return {
        response: {
          status: statusCodes.BAD_REQUEST,
          message: errorMessages.DAY_MODEL.DAY_MODEL_REQUIRED_FIELDS,
        },
      };
    } else {
      const existingWeekData = await weekModel.findOne({
        weekNumber,
        batchCode,
      });
      if (!existingWeekData) {
        return {
          response: {
            message: WEEK_DOES_NOT_EXIST_TO_INSERT_DAY,
            status: statusCodes.BAD_REQUEST,
          },
        };
      } else {
        const existingDayData = await dayModel.findOne({
          batchCode,
          weekNumber,
          dayNumber,
        });
        if (existingDayData) {
          return {
            response: {
              message: DAY_EXIST,
              status: statusCodes.BAD_REQUEST,
            },
          };
        } else {
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
            date,
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
        }
      }
    }
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
