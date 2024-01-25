import { errorMessages, localMessages, statusCodes } from "@constants";
import { meetingModel } from "@models";

export const getMeetingList = async (
  _parent: undefined,
  args: { data: GetMeetingListArgsType }
): Promise<MeetingListDataType> => {
  try {
    const { data } = args;
    const { isActive, isPaid, scheduledAt } = data;
    const { MEETING_MODEL } = localMessages;
    const meetingList = await meetingModel.find({
      isActive,
      isPaid,
      scheduledAt,
    });
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
