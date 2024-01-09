import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { useDispatch, useSelector } from "react-redux";
import {
  questionAttemptActions,
  selectQuestionAttempt,
} from "../slices/questionAttempt/questionAttemptSlice";
import { CREATE_QUESTION_ATTEMPT_BY_USER } from "../../graphql/mutation/questionAttempt/createQuestionAttemptByUser";
import { actions } from "../slices/question/questionSlice";

export const useQuestionAttempt = () => {
  const questionAttempt = useSelector(selectQuestionAttempt);
  const { setLoading } = questionAttemptActions;
  const dispatch = useDispatch();
  const createQuestionAttemptByUser = async (
    userResponse: QuestionSelectedValueType[],
    questionId: string
  ) => {
    try {
      dispatch(setLoading(true));
      const response = await apolloClient.mutate({
        mutation: CREATE_QUESTION_ATTEMPT_BY_USER,
        variables: {
          questionAttemptData: {
            response: userResponse,
            /* TODO: @dhananjay - Login is not implemented, need to update this once it gets implemented, putting userId directly for now  */
            userId: "6523b3424f9e607c618395cf",
            questionId,
          },
        },
      });
      const isCorrect =
        response?.data?.createQuestionAttemptByUser?.questionData?.isCorrect;
      dispatch(actions.setQuestionResponse({ isCorrect, questionId }));
      return response;
    } catch (err) {
      return;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    questionAttempt,
    createQuestionAttemptByUser,
  };
};
