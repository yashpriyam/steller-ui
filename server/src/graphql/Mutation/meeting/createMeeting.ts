import { errorMessages, localMessages, statusCodes } from "@constants";
import { meetingModel } from "@models";

export const createMeeting = async (
  _parent: undefined,
  args: { data: MeetingSchemaType }
): Promise<MeetingReturnType> => {
  const { data } = args;
  const { meetingNumber, title, password, link, isActive, scheduledAt, isPaid } = data;
  const { BAD_REQUEST, OK } = statusCodes;
  const { MEETING_MODEL } = errorMessages;
  try {
    if (!meetingNumber || !password || !title) {
      return {
        response: {
          status: BAD_REQUEST,
          message: MEETING_MODEL.MEETING_NUMBER_PASSWORD_AND_TITLE_IS_REQUIRED,
        },
      };
    } else {
      const existingMeetingData = await meetingModel.findOne({
        meetingNumber,
      });
      if (existingMeetingData) {
        return {
          response: {
            status: BAD_REQUEST,
            message: MEETING_MODEL.DUBLICATE_MEETING_NUMBER,
          },
        };
      } else {
        const meetingData = await meetingModel.create({
          meetingNumber,
          title,
          password,
          link,
          isActive,
          scheduledAt,
          isPaid
        });
        return {
          meetingData,
          response: {
            status: OK,
            message: localMessages.MEETING_MODEL.MEETING_CREATED_SUCCESSFULLY,
          },
        };
      }
    }
  } catch (err) {
    return {
      response: {
        status: BAD_REQUEST,
        message: MEETING_MODEL.UNABLE_TO_CREATE_MEETING,
      },
    };
  }
};
