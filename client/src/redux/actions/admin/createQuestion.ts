import { apolloClient } from "../../../graphql/apolloClient/apolloClient";
import { CREATE_QUESTION } from "../../../graphql/mutation/admin/question/createQuestion";

export const createQuestionApi = () => {
  const createQuestion = async ({
    title,
    answer,
    meta,
    marks,
    options,
    questionType,
  }: CreateQuestionInterface) => {
    console.log({ title, answer, meta, marks, questionType, options });
    const {
      batchCode,
      day,
      expiresInMins,
      isActive,
      isArchived,
      isOpenable,
      topic,
      type,
      week,
    } = meta as QuestionMetaDataType;
    console.log({
      batchCode,
      day,
      expiresInMins,
      isActive,
      isArchived,
      isOpenable,
      topic,
      type,
      week,
    });
    try {
      const response = await apolloClient.query({
        query: CREATE_QUESTION,
        variables: {
          questionData: {
            meta: {
              batchCode,
              day,
              expiresInMins,
              isActive,
              isOpenable,
              isArchived,
              type,
              topic,
              week,
            },
            marks,
            questionType,
            answer,
            options,
            title,
          },
        },
      });
      console.log({ response });

      return response.data;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    createQuestion,
  };
};
