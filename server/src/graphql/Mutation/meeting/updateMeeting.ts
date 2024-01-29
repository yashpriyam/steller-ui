import { errorMessages, localMessages, statusCodes } from "@constants";
import { meetingModel } from "@models";
import {
  isNonNullishValueExists,
  isNonUndefinedAndNullishValueExists,
  removeNullAndUndefinedKeys,
} from "@utils";

export const updateMeeting = async (
  _parent: undefined,
  args: { filter: UpdateMeetingFilterType; data: MeetingSchemaType }
) => {
  const { BAD_REQUEST, OK } = statusCodes;
  const { MEETING_MODEL } = errorMessages;
  try {
    const { filter, data } = args;
    const {
      meetingNumber,
      meetingCode,
      title,
      scheduledAt,
      isActive,
      isPaid,
      password,
      link,
      description,
    } = data;
    if (
      isNonNullishValueExists({
        meetingCode: filter.meetingCode,
        meetingNumber: filter.meetingNumber,
        title: filter.title,
      })
    ) {
      return {
        response: {
          status: BAD_REQUEST,
          message: MEETING_MODEL.MEETING_NUMBER_MEETING_CODE_OR_TITLE_REQUIRED,
        },
      };
    } else if (
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
      const meetingFilter = removeNullAndUndefinedKeys({
        meetingNumber: filter.meetingNumber,
        meetingCode: filter.meetingCode,
        title: filter.title,
      });
      const meetingData = await meetingModel.findOneAndUpdate(
        meetingFilter,
        {
          $set: {
            meetingNumber,
            meetingCode,
            title,
            isActive,
            isPaid,
            scheduledAt,
            link,
            password,
            description,
          },
        },
        { new: true }
      );
      if (meetingData) {
        return {
          meetingData,
          response: {
            status: OK,
            message: localMessages.MEETING_MODEL.SUCCESSFULLY_UPDATED_MEETING,
          },
        };
      } else {
        return {
          response: {
            status: BAD_REQUEST,
            message: MEETING_MODEL.CANNOT_FIND_MEETING_DETAILS,
          },
        };
      }
    }
  } catch (err) {
    return {
      response: {
        status: BAD_REQUEST,
        message: MEETING_MODEL.UNABLE_TO_UPDATE_MEETINGS,
      },
    };
  }
};
