import { localMessages, errorMessages, statusCodes } from "@constants";
import { questionModel } from "@models";
import { removeNullAndUndefinedKeys } from "@utils";

export const getAllQuestions = async (
  _parent: undefined,
  args: { filterData: filterInputType }
): Promise<QuestionsReturnType | unknown> => {
  const { QUESTION_FOUND_SUCCESS } = localMessages.QUESTION_MODEL;
  const { QUESTION_NOT_FOUND } = errorMessages.QUESTION_MODEL;
  const errorData: CustomResponseType = {
    message: QUESTION_NOT_FOUND,
    status: statusCodes.BAD_REQUEST,
  };
  try {
    const { filterData } = args;
    const filteredData = removeNullAndUndefinedKeys(filterData);
    const updatedFields: Record<string, string> = {};
    for (const key in filteredData) {
      const fullPath = `meta.${key}`;
      updatedFields[fullPath] = filteredData[key];
    }
    const questionsData: QuestionSchemaType[] = await questionModel.find(
      updatedFields
    );
    const response: CustomResponseType = questionsData.length
      ? {
          message: QUESTION_FOUND_SUCCESS,
          status: statusCodes.OK,
        }
      : errorData;
    return {
      questionData: questionsData,
      response: response,
    };
  } catch (error) {
    return { response: errorData };
  }
};
