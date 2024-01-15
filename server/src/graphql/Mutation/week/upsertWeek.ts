import { weekModel } from "@models";

import { errorMessages, localMessages, statusCodes } from "@constants";

export const upsertWeek = async (
    parent: undefined,
    args: { weekData: WeekDataType }
): Promise<WeekDataOutputType> => {
    const { WEEK_CREATION_FAILED } = errorMessages.WEEK_MODEL;
    const errorData: CustomResponseType = {
        message: WEEK_CREATION_FAILED,
        status: statusCodes.BAD_REQUEST,
    };
    try {
        const { WEEK_CREATION_SUCCESS } = localMessages.WEEK_MODEL;
        const { weekData } = args;
        const {
            weekNumber,
            description,
            isActive,
            isDisabledForUnpaidUsers,
            title,
            batchCode,
        } = weekData;
        const updatedWeekData: WeekDataType = await weekModel.findOneAndUpdate(
            { batchCode, weekNumber },
            {
                batchCode,
                weekNumber, 
                description,
                isActive,
                isDisabledForUnpaidUsers,
                title,
            },
            { new: true, upsert: true }
        );
        return {
            weekData: updatedWeekData,
            response: updatedWeekData
                ? {
                    message: WEEK_CREATION_SUCCESS,
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