import { errorMessages, localMessages, statusCodes } from "@constants";
import { weekModel } from "@models";

export const getScheduleData = async (
    parent: undefined,
    args: { weekDataFilter: WeekDataType }
): Promise<AllWeekDataOutputType> => {
    const { WEEK_NOT_FOUND } = errorMessages.WEEK_MODEL;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: WEEK_NOT_FOUND,
    }
    try {
        const { WEEK_FOUND, DAYS } = localMessages.WEEK_MODEL;
        const { weekDataFilter } = args;
        const weekData: WeekDataType[] = await weekModel.find(weekDataFilter).populate(DAYS);
        return {
            weekData,
            response: weekData.length ? {
                status: statusCodes.OK,
                message: WEEK_FOUND,
            } : errorData,
        };
    } catch (err) {
        return {
            response: errorData,
        };
    }
};