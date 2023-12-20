import { notesModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { removeNullAndUndefinedKeys } from "@utils";

export const getAllNotes = async (
  _parent = undefined,
  args: { filterData: getNotesFilterInputType }
): Promise<getAllNotesOutputType | unknown> => {
  const { NOTES_FOUND } = localMessages.NOTES_MODEL;
  const { NOTES_NOT_FOUND } = errorMessages.NOTES_MODEL;
  const errorData: CustomResponseType = {
    message: NOTES_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    const { filterData } = args;
    const queryConditions = removeNullAndUndefinedKeys(filterData);
    if (queryConditions.topics) {
      queryConditions.topics = { $in: filterData.topics };
    }
    const readAllNotesData: [NotesDataType] = await notesModel.find(
      queryConditions
    );

    const response: CustomResponseType = readAllNotesData
      ? {
          message: NOTES_FOUND,
          status: statusCodes.OK,
        }
      : errorData;
    return {
      notesData: readAllNotesData,
      response,
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
