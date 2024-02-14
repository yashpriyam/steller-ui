import { dayModel, questionModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
export const createQuestion = async (
  _parent: undefined,
  args: { questionData: QuestionSchemaType }
): Promise<CreateQuestionOutputType | unknown> => {
  console.log("hello bro, chal ja please");
  const { QUESTION_CREATION_SUCCESS } = localMessages.QUESTION_MODEL;
  const { QUESTION_CREATION_FAILED } = errorMessages.QUESTION_MODEL;
  const errorData: CustomResponseType = {
    message: QUESTION_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    console.log("create question called  server");

    const { questionData } = args;
    const { title, questionType, answer, marks, options, meta } = questionData;

    const { batchCode, day, week } = meta;

    const dayResponse = await dayModel.findOne({
      dayNumber: day,
      batchCode: batchCode,
      weekNumber: week,
    });

    if (!dayResponse) {
      return {
        response: {
          message: localMessages.DAY_MODEL.WEEK_DOES_NOT_EXIST_TO_INSERT_DAY,
          statusCodes: statusCodes.BAD_REQUEST,
        },
      };
    }

    const createdQuestionData: QuestionSchemaType = await questionModel.create({
      title,
      questionType,
      marks,
      options,
      answer,
      meta,
    });

    if (!createdQuestionData) {
      return { response: errorData };
    }

    dayResponse.questions?.push(createdQuestionData._id);
    await dayResponse.save();

    return {
      questionData: createdQuestionData,
      response: {
        message: localMessages.QUESTION_MODEL.QUESTION_CREATION_SUCCESS,
        staus: statusCodes.OK,
      },
    };
  } catch (error) {
    return { response: errorData };
  }
};
