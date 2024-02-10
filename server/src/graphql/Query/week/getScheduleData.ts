import { errorMessages, localMessages, statusCodes } from "@constants";
import { notesModel, questionModel, videoModel, weekModel } from "@models";
import { sortDirection } from "@utils";

export const getScheduleData = async (
    parent: undefined,
    args: { accessWeeks : number[], weekDataFilter: WeekDataType, sortData: SortDataType}
): Promise<AllWeekDataOutputType> => {
    const { WEEK_NOT_FOUND } = errorMessages.WEEK_MODEL;
    const errorData: CustomResponseType = {
        status: statusCodes.BAD_REQUEST,
        message: WEEK_NOT_FOUND,
    }
    try {
        const { WEEK_FOUND, DAYS } = localMessages.WEEK_MODEL;
        const { weekDataFilter, sortData, accessWeeks } = args;

        const { asc, desc } = sortDirection;
        const {sortBy, sortOrder = desc} = sortData || {};

        const accessibleWeeks = { weekNumber: { $in: accessWeeks ?? [] } };
        const nonAccessibleWeeks = { weekNumber: { $nin: accessWeeks ??[] } };
        const accessibleWeeksData : GetWeekDataType[] = await weekModel.find({...accessibleWeeks, ...weekDataFilter}).populate({
            path: DAYS,
            populate: [
            {
              path: 'questions',
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
          })
          const nonAccessibleWeeksData : GetWeekDataType[] = await weekModel.find({...nonAccessibleWeeks, ...weekDataFilter}, {days: 0}) 
          const weekData = [...accessibleWeeksData, ...nonAccessibleWeeksData]

          if (sortBy && sortOrder) {
            weekData.sort((a, b) => {
                const aValue  = a[sortBy];
                const bValue = b[sortBy];
                if (aValue < bValue) {
                    return sortOrder === asc ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortOrder === asc ? 1 : -1;
                }
                return 0;
            });
        }
        return weekData.length ? {
            weekData,
            response:  {
                status: statusCodes.OK,
                message: WEEK_FOUND,
            }
        } : {response : errorData};
    } catch (err) {
        return {
            response: errorData,
        };
    }
};