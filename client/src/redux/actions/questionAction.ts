import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions } from "../slices/question/questionSlice";
import { GET_ALL_QUESTIONS } from "../../graphql/query/question/getAllQuestions";
import { selectQuestions } from "../slices/question/questionSlice";
import { useDispatch, useSelector } from "react-redux";

export const useQuestions = () => {
  const questions = useSelector(selectQuestions);
  const dispatch = useDispatch();
  const getAllQuestions = async () => {
    const response = await apolloClient.query({
      query: GET_ALL_QUESTIONS,
      variables: {
        filterData: {
          isActive: true,
        },
      },
    });
    dispatch(actions.setQuestions(response.data));
    return response;
  };

  return {
    questions,
    getAllQuestions,
  };
};
