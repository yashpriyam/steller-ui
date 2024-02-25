import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { useDispatch, useSelector } from "react-redux";
import {
  questionAttemptActions,
  selectQuestionAttempt,
} from "../slices/questionAttempt/questionAttemptSlice";
import { CREATE_QUESTION_ATTEMPT_BY_USER } from "../../graphql/mutation/questionAttempt/createQuestionAttemptByUser";
import { actions } from "../slices/question/questionSlice";
import { DSA_QUESTION_ATTEMPT } from "../../graphql/mutation/questionAttempt/dsaQuestionAttempt";

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
            questionId,
            response: userResponse,
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

  const dsaQuestionAttemptApi = async ({
    questionId,
    dsaResponse,
  }: DsaQuestionAttemptType) => {    
    try {
      const response = await apolloClient.mutate({
        mutation: DSA_QUESTION_ATTEMPT,
        variables: {
          questionAttemptData: {
            questionId,
            dsaResponse: {
              questionSubmissionStatus: dsaResponse?.questionSubmissionStatus,
              submissionLink: dsaResponse?.submissionLink,
              testCases: {
                passedTestCases: dsaResponse?.testCases?.passedTestCases,
                totalTestCases:dsaResponse?.testCases?.totalTestCases
              },
            },
          },
        },
      });
      return response.data.dsaQuestionAttempt;      
    } catch (error) {
      console.log({error})
    }
  };

  return {
    dsaQuestionAttemptApi,
    questionAttempt,
    createQuestionAttemptByUser,
  };
};
