import { dayModel, weekModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const deleteAllDay = async (
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
        let newDayData = await dayModel.deleteMany({})
        console.log({ newDayData });
        const weekData = await weekModel.deleteMany({});
        console.log({ weekData });
        return {
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
