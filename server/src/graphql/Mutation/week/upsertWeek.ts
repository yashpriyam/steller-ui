import { weekModel } from "@models";

import { errorMessages, localMessages, statusCodes } from "@constants";

export const upsertWeek = async (
    parent: undefined,
    args: { weekData: WeekSchemaType }
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
            days,
        } = weekData;
        const newWeekData: WeekDataType = await weekModel.findOneAndUpdate(
            { weekNumber },
            {
                weekNumber,
                description,
                isActive,
                isDisabledForUnpaidUsers,
                title,
                days,
            },
            { new: true, upsert: true }
        );

        return {
            weekData: newWeekData,
            response: newWeekData
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