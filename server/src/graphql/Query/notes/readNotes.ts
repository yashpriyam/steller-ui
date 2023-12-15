import { notesModel } from "@models";
import { errorMessages, localMessages, statusCodes } from "@constants";
import { removeNullKeys } from "@utils";

export const readNotes = async (
  _parent = undefined,
  args: { filterData: ReadNotesFilterInputType }
): Promise<ReadNotesOutputType | unknown> => {
  const { NOTES_FOUND } = localMessages.NOTES_MODEL;
  const { NOTES_NOT_FOUND } = errorMessages.NOTES_MODEL;
  const errorData: CustomResponseType = {
    message: NOTES_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    const { filterData } = args;

    const queryConditions: Record<string, number | string | object> =
      removeNullKeys(filterData);
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
