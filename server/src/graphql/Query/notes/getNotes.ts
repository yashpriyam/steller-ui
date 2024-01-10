import { notesModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { removeNullAndUndefinedKeys } from "@utils";

export const getNotes = async (
  _parent = undefined,
  args: { filterData: GetNotesFilterInputType }
): Promise<getNotesOutputType | unknown> => {
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
    const readNotesData: NotesDataType = await notesModel.findOne(
      queryConditions
    );

    const response: CustomResponseType = readNotesData
      ? {
          message: NOTES_FOUND,
          status: statusCodes.OK,
        }
      : errorData;
    return {
      notesData: readNotesData,
      response,
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
