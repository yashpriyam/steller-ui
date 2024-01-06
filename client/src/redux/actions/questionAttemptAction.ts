import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { useSelector } from "react-redux";
import { selectQuestionAttempt } from "../slices/questionAttempt/questionAttemptSlice";
import { CREATE_QUESTION_ATTEMPT_BY_USER } from "../../graphql/mutation/questionAttempt/createQuestionAttemptByUser";

export const useQuestionAttempt = () => {
  const questionAttempt = useSelector(selectQuestionAttempt);
  const createQuestionAttemptByUser = async (
    userResponse: QuestionResponseType[],
    questionId: string
  ) => {
    const response = await apolloClient.mutate({
      mutation: CREATE_QUESTION_ATTEMPT_BY_USER,
      variables: {
        questionAttemptData: {
          response: userResponse,
          userId: "6523b3424f9e607c618395cf",
          questionId,
        },
      },
    });
    return response;
  };

  return {
    questionAttempt,
    createQuestionAttemptByUser,
  };
};
