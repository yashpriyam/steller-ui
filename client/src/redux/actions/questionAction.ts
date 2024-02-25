import React from "react";
import { apolloClient } from "../../graphql/apolloClient/apolloClient";
import { actions } from "../slices/question/questionSlice";
import { GET_ALL_QUESTIONS } from "../../graphql/query/question/getAllQuestions";
import { selectQuestions } from "../slices/question/questionSlice";
import { useDispatch, useSelector } from "react-redux";
import { GET_ALL_DSA_QUESTIONS } from "../../graphql/query/question/getAllDsaQuestion";

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
      dispatch(actions.setIsQuestionLoading(true));
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
    } finally {
      dispatch(actions.setIsQuestionLoading(false));
    }
  };
  
  const getAllDsaQuestions = async ({
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
      dispatch(actions.setIsQuestionLoading(true));
      const response = await apolloClient.query({
        query: GET_ALL_DSA_QUESTIONS,
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
      return response.data.getAllDsaQuestions;
    } catch (err) {
      console.log(err);
    }
  };
  return {
    getAllDsaQuestions,
    questions,
    getAllQuestions,
  };
};
