import { errorMessages, localMessages, statusCodes } from "@constants";
import { meetingModel } from "@models";
import { removeNullAndUndefinedKeys } from "@utils";

export const getMeetingList = async (
  _parent: undefined,
  args: { data: GetMeetingListArgsType }
): Promise<MeetingListDataType> => {
  try {
    const { data } = args;
    const { isActive, isPaid, scheduledAt, meetingCodeList = [] } = data;
    const { MEETING_MODEL } = localMessages;
    const meetingFilter: GetMeetingListArgsType = removeNullAndUndefinedKeys({
      isActive,
      isPaid,
      scheduledAt,
    });
    const meetingList = await meetingModel.find(
      meetingCodeList.length 
      ? {
          meetingCode: {
            $in: meetingCodeList
          },
          ...meetingFilter,
        } 
      : meetingFilter);
    if (meetingList.length) {
      return {
        meetingList,
        response: {
          status: statusCodes.OK,
          message: MEETING_MODEL.SUCCESSFULLY_FOUND_MEETING_DETAILS,
        },
      };
    } else {
      return {
        meetingList: [],
        response: {
          status: statusCodes.OK,
          message: MEETING_MODEL.NO_MEETING_FOUND,
        },
      };
    }
  } catch (err) {
    return {
      response: {
        status: statusCodes.BAD_REQUEST,
        message: errorMessages.MEETING_MODEL.UNABLE_TO_FIND_MEETING,
      },
    };
  }
};
