import { questionModel } from "@models"
import {localMessages,errorMessages,statusCodes} from "@constants"
export const createQuestion = async (_parent: undefined, args: { questionData: QuestionSchemaType }): Promise<CreateQuestionOutputType | unknown> => {
    const { QUESTION_CREATION_SUCCESS } = localMessages.QUESTION_MODEL;
    const { QUESTION_CREATION_FAILED } = errorMessages.QUESTION_MODEL;
     const errorData: CustomResponseType = {
       message: QUESTION_CREATION_FAILED,
       status: statusCodes.BAD_REQUEST,
     };
    try {
        const { questionData } = args;
        const {question,questionType,answer,batchCode,marks,options,meta } = questionData;
        const createdQuestionData: QuestionSchemaType = await questionModel.create({
            question,questionType,batchCode,marks,options,answer,meta
        })
            const response: CustomResponseType = createdQuestionData
              ? {
                  message: QUESTION_CREATION_SUCCESS,
                  status: statusCodes.CREATED,
                }
              : errorData;

        return {
            questionData:createdQuestionData,response
        }
    }
    catch (error) {
        return {response:errorData}
    }
}