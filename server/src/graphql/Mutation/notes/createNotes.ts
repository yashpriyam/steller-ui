import { notesModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";

export const createNotes = async (
  _parent: undefined,
  args: { notesData: CreateNotesInputType }
): Promise<CreateNotesOutputType | unknown> => {
  const { NOTES_CREATION_SUCCESS } = localMessages.NOTES_MODEL;
  const { NOTES_CREATION_FAILED } = errorMessages.NOTES_MODEL;
  const errorData: CustomResponseType = {
    message: NOTES_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { notesData } = args;
    const {
      title,
      description,
      link,
      topics,
      dayNumber,
      weekNumber,
      noOfPages,
      estimatedReadingTime,
    } = notesData;

    const createdNotesdata: NotesDataType = await notesModel.create({
      title,
      description,
      link,
      topics,
      dayNumber,
      weekNumber,
      noOfPages,
      estimatedReadingTime,
    });

    const response: CustomResponseType = createdNotesdata
      ? {
          message: NOTES_CREATION_SUCCESS,
          status: statusCodes.CREATED,
        }
      : errorData;

    return {
      notesData: createdNotesdata,
      response,
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
