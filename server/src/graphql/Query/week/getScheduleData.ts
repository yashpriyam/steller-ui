import { errorMessages, localMessages, statusCodes } from "@constants";
import { notesModel, questionModel, videoModel, weekModel } from "@models";
import { sortDirection } from "@utils";

export const getScheduleData = async (
    parent: undefined,
    args: { weekDataFilter: WeekDataType, sortData: SortDataType}
): Promise<AllWeekDataOutputType> => {
    const { WEEK_NOT_FOUND } = errorMessages.WEEK_MODEL;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: WEEK_NOT_FOUND,
    }
    try {
        const { WEEK_FOUND, DAYS } = localMessages.WEEK_MODEL;
        const { weekDataFilter, sortData } = args;
        const { asc, desc } = sortDirection;
        const {sortBy, sortOrder = desc} = sortData;
        const sortOptions: { [key: string]: SortDirectionType } = {};
        if (sortBy && sortOrder) {
           sortOptions[sortBy] = sortOrder;
        }
        const weekData: WeekDataType[] = await weekModel.find(weekDataFilter).populate({
            path: DAYS,
            populate: [
            {
              path: 'questions videos',
              model: questionModel, 
            },
            {
                path: 'videos',
                model: videoModel, 
              },
              {
                path: 'notes',
                model: notesModel, 
              },
        ]
          }).sort(sortOptions);
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