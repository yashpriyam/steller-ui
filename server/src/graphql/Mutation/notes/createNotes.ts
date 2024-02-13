import { dayModel, notesModel } from "@models";
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
      batchCode
    } = notesData;

    const dayResponse = await dayModel.findOne({weekNumber, dayNumber, batchCode})

    if (!dayResponse) {
      return {response: {
          message: localMessages.DAY_MODEL.WEEK_DOES_NOT_EXIST_TO_INSERT_DAY,
          statusCodes: statusCodes.BAD_REQUEST
      }}
  }


    const createdNotesdata: NotesDataType = await notesModel.create({
      title,
      description,
      link,
      topics,
      dayNumber,
      weekNumber,
      noOfPages,
      estimatedReadingTime,
      batchCode
    });

    if (!createdNotesdata) {
      return {response: errorData}
  }
     dayResponse.notes?.push(createdNotesdata._id)
     await dayResponse.save()

    return {
      notesData: createdNotesdata,
      response: {
        message: NOTES_CREATION_SUCCESS,
        status: statusCodes.CREATED,
      },
    };
  } catch (err) {
    return {
      response: errorData,
    };
  }
};
