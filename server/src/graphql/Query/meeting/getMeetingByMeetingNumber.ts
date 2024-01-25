import { errorMessages, localMessages, statusCodes } from "@constants";
import { meetingModel } from "@models";

export const getMeetingByMeetingNumber = async (
  _parent: undefined,
  args: { meetingNumber: number }
): Promise<GetMeetingOutputType> => {
  try {
    const { meetingNumber } = args;
    const { MEETING_MODEL } = localMessages;
    const { NO_MEETING_FOUND, SUCCESSFULLY_FOUND_MEETING_DETAILS } =
      MEETING_MODEL;
    const meetingData = await meetingModel.findOne({ meetingNumber });
    return {
      meetingData,
      response: {
        status: statusCodes.OK,
        message: meetingData
          ? SUCCESSFULLY_FOUND_MEETING_DETAILS
          : NO_MEETING_FOUND,
      },
    };
  } catch (err) {
    return {
      response: {
        status: statusCodes.BAD_REQUEST,
        message: errorMessages.MEETING_MODEL.UNABLE_TO_FIND_MEETING,
      },
    };
  }
};
