import { errorMessages, localMessages, statusCodes } from "@constants";
import { dayModel, weekModel } from "@models";
import { removeNullAndUndefinedKeys } from "@utils";

export const getScheduleData = async (
    parent: undefined,
    args: { weekDataFilter: WeekDataType }
): Promise<AllWeekOutputDataType> => {
    const { WEEK_NOT_FOUND } = errorMessages.WEEK_MODEL;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: WEEK_NOT_FOUND,
    }
    try {
        const { WEEK_FOUND } = localMessages.WEEK_MODEL;
        const { weekDataFilter } = args;
        const {
            description,
            isActive,
            isDisabledForUnpaidUsers,
            title,
            weekNumber
        }: WeekDataType = weekDataFilter;
        console.log({weekDataFilter});
        const modifiedFilterData : object =  removeNullAndUndefinedKeys({
            description,
            isActive,
            isDisabledForUnpaidUsers,
            title,
            weekNumber
        })
        console.log({ modifiedFilterData });
        const weekData: WeekDataType[] = await weekModel.find(modifiedFilterData).populate("days");
        console.log({weekData})
        return {
            weekData,
            response: weekData.length ? {
                status: statusCodes.OK,
                message: WEEK_FOUND,
            } : errorData,
        };
    } catch (err) {
        console.log(err)
        return {
            response: errorData,
        };
    }
};