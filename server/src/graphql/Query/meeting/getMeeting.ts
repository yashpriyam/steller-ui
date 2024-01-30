import { errorMessages, localMessages, statusCodes } from "@constants";
import { meetingModel } from "@models";
import {
  isNonNullishValueExists,
  removeNullAndUndefinedKeys,
} from "@utils";

export const getMeeting = async (
  _parent: undefined,
  args: { meetingFilter: GetMeetingArgsType }
): Promise<GetMeetingOutputType> => {
  try {
    const { meetingFilter } = args;
    const { meetingNumber, meetingCode, title } = meetingFilter;
    const { MEETING_MODEL } = localMessages;
    const { NO_MEETING_FOUND, SUCCESSFULLY_FOUND_MEETING_DETAILS } =
      MEETING_MODEL;
    if (
      isNonNullishValueExists({
        meetingNumber,
        meetingCode,
        title,
      })
    ) {
      return {
        response: {
          status: statusCodes.BAD_REQUEST,
          message:
            errorMessages.MEETING_MODEL
              .MEETING_NUMBER_MEETING_CODE_OR_TITLE_REQUIRED,
        },
      };
    } else {
      const meetingData = await meetingModel.findOne(
        removeNullAndUndefinedKeys({
          meetingNumber,
          meetingCode,
          title,
        })
      );
      return {
        meetingData,
        response: meetingData ?   
        {
          status: statusCodes.OK,
          message: SUCCESSFULLY_FOUND_MEETING_DETAILS
        }
        : {
          status: statusCodes.BAD_REQUEST,
          message: NO_MEETING_FOUND
        }
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
