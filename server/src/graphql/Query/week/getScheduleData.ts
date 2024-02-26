import { errorMessages, localMessages, statusCodes } from '@constants';
import { User, notesModel, questionModel, videoModel, weekModel } from '@models';
import { isAdmin, sortDirection } from '@utils';
const { WEEK_NOT_FOUND } = errorMessages.WEEK_MODEL;
const { WEEK_FOUND, DAYS } = localMessages.WEEK_MODEL;
const errorData: CustomResponseType = {
  status: statusCodes.BAD_REQUEST,
  message: WEEK_NOT_FOUND,
};
const { asc, desc } = sortDirection;
const populateWeekData = async ( {allowAccess=false, isAdminUser, DAYS : path, accessWeeks, weekDataFilter={}, sortData }: { 
  DAYS: string; 
  accessWeeks?: number[]; 
  weekDataFilter: WeekDataType; 
  sortData?: SortDataType; 
  isAdminUser?: boolean;
  allowAccess?: boolean;
} ) : Promise<GetWeekDataType[]> => {
  const { sortBy, sortOrder } : SortDataType = sortData || {};

  const accessibleWeeks = isAdminUser || allowAccess ? {} : { weekNumber: { $in: accessWeeks ?? [] } };
  const allWeeksData: GetWeekDataType[] = await weekModel
    .find({ ...accessibleWeeks, ...weekDataFilter })
    .populate({
      path,
      populate: [
        {
          path: "questions",
          model: questionModel,
          match: { questionType: { $ne: "dsa" } }, // Exclude documents with questionType equal to "dsa"
        },
        {
          path: "videos",
          model: videoModel,
        },
        {
          path: "notes",
          model: notesModel,
        },
      ],
    });
      if (sortBy && sortOrder) {
        allWeeksData.sort((a, b) => {
          const aValue = a[sortBy];
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
      return allWeeksData;
}
export const getScheduleData = async (
  parent: undefined,
  args: {
    accessWeeks: number[];
    weekDataFilter: WeekDataType;
    sortData: SortDataType;
  },
  { contextData }: ContextType
): Promise<AllWeekDataOutputType> => {
  try {
  const {_id : userId, email} = contextData.user || {} ;
  const { weekDataFilter, sortData, accessWeeks } = args;
  const { asc, desc } = sortDirection;
  const { sortBy, sortOrder = desc } = sortData || {};
  const getUserData = await User.findOne({ _id: userId });
  const isAdminUser = await isAdmin(email)
  const allowAccess = getUserData?.temporaryAccess?.allowTemporaryAccess;
  if (allowAccess || isAdminUser) {
    const getWeekData = await populateWeekData({allowAccess,isAdminUser, DAYS, weekDataFilter , sortData});
    return getWeekData ? {
        weekData: getWeekData,
        response: {
          status: statusCodes.OK,
          message: WEEK_FOUND,
        },
      } : { response : errorData}
  }

    const nonAccessibleWeeks = { weekNumber: { $nin: accessWeeks ?? [] } };
    const accessibleWeeksData  = await populateWeekData({isAdminUser, accessWeeks,weekDataFilter, DAYS, sortData});
    const nonAccessibleWeeksData: GetWeekDataType[] = await weekModel.find(
      { ...nonAccessibleWeeks, ...weekDataFilter },
      { days: 0 }
    );
    const weekData = [...accessibleWeeksData, ...nonAccessibleWeeksData];

    if (sortBy && sortOrder) {
      weekData.sort((a, b) => {
        const aValue = a[sortBy];
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
    return weekData.length
      ? {
          weekData,
          response: {
            status: statusCodes.OK,
            message: WEEK_FOUND,
          },
        }
      : { response: errorData };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};