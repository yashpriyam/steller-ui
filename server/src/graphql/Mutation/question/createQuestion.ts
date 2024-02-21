import { dayModel, questionModel } from "@models";
import { localMessages, errorMessages, statusCodes } from "@constants";
import { QuestionTypeObject } from "@utils";
import { checkIsTopicExist } from "@utils";
export const createQuestion = async (
  _parent: undefined,
  args: { questionData: QuestionSchemaType }
): Promise<CreateQuestionOutputType | unknown> => {
  const { QUESTION_CREATION_SUCCESS } = localMessages.QUESTION_MODEL;
  const { INVALID_TOPIC_AND_SUBTOPIC } = errorMessages.TOPIC;
  const { QUESTION_CREATION_FAILED,QUESTION_OPTIONS_NOT_FOUND } = errorMessages.QUESTION_MODEL;
  const errorData: CustomResponseType = {
    message: QUESTION_CREATION_FAILED,
    status: statusCodes.BAD_REQUEST,
  };

  try {
    const { questionData } = args;
    const { title, questionType, answer, marks, options, meta ,questionTypeTags,questionSubTopics } = questionData;

    const { batchCode, day, week, topic } = meta;
    const isTopicExist = await checkIsTopicExist({ topic, subTopics: questionSubTopics ?? [] })
    if (!isTopicExist) {
      return {
        response: {
          message: INVALID_TOPIC_AND_SUBTOPIC,
          status:statusCodes.BAD_REQUEST,
        } 
      }
    }
    
    const dayResponse = await dayModel.findOne({
      dayNumber: day,
      batchCode: batchCode,
      weekNumber: week,
    });

    if (!dayResponse) {
      return {
        response: {
          message: localMessages.DAY_MODEL.WEEK_DOES_NOT_EXIST_TO_INSERT_DAY,
          status: statusCodes.BAD_REQUEST,
        },
      };
    }
    const questionTypes = {
      Single: questionType===QuestionTypeObject.single,
      Multi: questionType===QuestionTypeObject.multi,
    }
    if((questionTypes.Single || questionTypes.Multi) && !Boolean(options?.length)){
      return {
        response : {
          message: QUESTION_OPTIONS_NOT_FOUND,
          status: statusCodes.BAD_REQUEST,
        }
      }
    }
    const createdQuestionData: QuestionSchemaType = await questionModel.create({
      title,
      questionType,
      marks,
      options,
      answer,
      meta,
      questionTypeTags,
      questionSubTopics,
    });

    if (!createdQuestionData) {
      return { response: errorData };
    }

    dayResponse.questions?.push(createdQuestionData._id);
    await dayResponse.save();

    return {
      questionData: createdQuestionData,
      response: {
        message: QUESTION_CREATION_SUCCESS,
        status: statusCodes.OK,
      },
    };
  } catch (error) {
    return { response: errorData };
  }
};
