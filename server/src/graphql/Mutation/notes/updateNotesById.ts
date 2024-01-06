import { ObjectId } from "mongoose";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { notesModel } from "@models";

export const updateNotesById = async (
  _parent: undefined,
  args: { notesId: ObjectId; notesData: UpdateNotesInputType }
): Promise<UpdateNotesOutputType | unknown> => {
  const { NOTES_UPDATION_SUCCESS } = localMessages.NOTES_MODEL;
  const { NOTES_UPDATION_FAILED } = errorMessages.NOTES_MODEL;
  const errorData:CustomResponseType = {
    status: statusCodes.BAD_REQUEST,
    message: NOTES_UPDATION_FAILED,
  };
  try {
    const { notesId, notesData } = args;
    const {
      dayNumber,
      description,
      estimatedReadingTime,
      link,
      noOfPages,
      title,
      topics,
    } = notesData;
    const notesUpdatedData: NotesDataType = await notesModel.findByIdAndUpdate(
      notesId,
      {
        link,
        title,
        topics,
        noOfPages,
        estimatedReadingTime,
        dayNumber,
        description,
      },
      { new: true }
    );
    const response: CustomResponseType = notesUpdatedData
      ? {
          message: NOTES_UPDATION_SUCCESS,
          status: statusCodes.OK,
        }
      : errorData;

    return {
      notesData: notesUpdatedData,
      response,
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
