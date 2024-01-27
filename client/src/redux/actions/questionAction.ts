import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions } from "../slices/question/questionSlice";
import { GET_ALL_QUESTIONS } from "../../graphql/query/question/getAllQuestions";
import { selectQuestions } from "../slices/question/questionSlice";
import { useDispatch, useSelector } from "react-redux";

export const useQuestions = () => {
  const questions = useSelector(selectQuestions);
  const dispatch = useDispatch();
  const getAllQuestions = async ({
    day,
    week,
    batchCode,
    isActive,
    isArchived,
    topic,
    skip,
    limit,
  }: GetAllQuestionProps) => {    
    try {
      const response = await apolloClient.query({
        query: GET_ALL_QUESTIONS,
        variables: {
          filterData: {
            day,
            week,
            batchCode,
            isActive,
            isArchived,
            topic,
          },
          pagination: {
            skip,
            limit,
          },
        },
      });
      dispatch(actions.setQuestions(response.data));
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    questions,
    getAllQuestions,
  };
};
