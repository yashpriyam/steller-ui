import { ObjectId } from "mongoose";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { notesModel } from "@models";
  
export const updateNotesById = async (
  _parent: undefined,
  args: { notesId: ObjectId; notesData: UpdateNotesInputType }
): Promise<UpdateNotesOutputType | unknown> => {
  const { NOTES_UPDATION_SUCCESS } = localMessages.NOTES_MODEL;
  const { NOTES_UPDATION_FAILED } = errorMessages.NOTES_MODEL;
  const errorData: Record<string, unknown> = {
    status: statusCodes.BAD_REQUEST,
    message: NOTES_UPDATION_FAILED,
  };
  try {
    const { notesId, notesData } = args;
    const {
      dayNumber,
      description,
      estimatedReadingTime,
      links,
      noOfPages,
      title,
      topics,
    } = notesData;
    const notesUpdatedData: NotesDataType = await notesModel.findByIdAndUpdate(
      notesId,
      {
        links,
        title,
        topics,
        noOfPages,
        estimatedReadingTime,
        dayNumber,
        description,
      },
      { new: true }
    );
    const response = notesUpdatedData
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
