import { errorMessages, localMessages, statusCodes } from "@constants";
import { meetingModel } from "@models";
import { isNonUndefinedAndNullishValueExists } from "@utils";

export const createMeeting = async (
  _parent: undefined,
  args: { data: MeetingSchemaType }
): Promise<MeetingReturnType> => {
  const { data } = args;
  const {
    meetingNumber,
    meetingCode,
    title,
    password,
    link,
    isActive,
    scheduledAt,
    isPaid,
    description,
  } = data;
  const { BAD_REQUEST, OK } = statusCodes;
  const { MEETING_MODEL } = errorMessages;
  try {
    if (
      isNonUndefinedAndNullishValueExists({
        meetingNumber,
        meetingCode,
        title,
        password,
      })
    ) {
      return {
        response: {
          status: BAD_REQUEST,
          message: MEETING_MODEL.MEETING_REQUIRED_FIELDS,
        },
      };
    } else {
      const meetingList = await meetingModel.find({
        $or: [{ meetingNumber }, { meetingCode }, { title }],
      });
      if (meetingList?.length) {
        return {
          response: {
            status: BAD_REQUEST,
            message: MEETING_MODEL.DUBLICATE_MEETING_FIELDS,
          },
        };
      } else {
        const meetingData = await meetingModel.create({
          meetingNumber,
          meetingCode,
          title,
          password,
          link,
          isActive,
          scheduledAt,
          isPaid,
          description,
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
