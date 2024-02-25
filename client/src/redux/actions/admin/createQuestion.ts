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
    questionTypeTags,
    questionSubTopics,
    description
  }: CreateQuestionInterface) => {    
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
    try {
      const response = await apolloClient.mutate({
        mutation: CREATE_QUESTION,
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
            questionTypeTags,
            answer,
            options,
            title,
            questionSubTopics,
            description
          },
        },
      });
      return response.data.createQuestion;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    createQuestion,
  };
};
