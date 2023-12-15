import { notesModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { ObjectId } from "mongoose";

export const deleteNotesById = async (
  _parent: undefined,
  args: { notesId: ObjectId }
): Promise<DeletedNotesOutputType | unknown> => {
  const { NOTES_DELETION_SUCCESS } = localMessages.NOTES_MODEL;
  const { NOTES_DELETION_FAILED } = errorMessages.NOTES_MODEL;
  const errorData: CustomResponseType = {
    status: statusCodes.BAD_REQUEST,
    message: NOTES_DELETION_FAILED,
  };
  try {
    const { notesId } = args;
    const deletedNotesdata: NotesDataType = await notesModel.findByIdAndDelete(
      notesId
    );
    const response:CustomResponseType = deletedNotesdata
      ? {
          message: NOTES_DELETION_SUCCESS,
          status: statusCodes.OK,
        }
      : errorData;

    return {
      notesData: deletedNotesdata,
      response,
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
