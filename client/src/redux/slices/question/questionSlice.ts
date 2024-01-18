import { createSlice } from "@reduxjs/toolkit";

const initialState: QuestionStateInterface = {
};

export const questionSlice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {
    setQuestions: (state, action) => {
      const {
        questions,
        totalCorrectQuestions,
        totalInCorrectQuestions,
        totalQuestions,
        totalUnAttemptedQuestions,
        response,
      } = action.payload.getAllQuestions;
      state.questions = questions;
      state.totalQuestions = totalQuestions;
      state.totalCorrectQuestions = totalCorrectQuestions;
      state.totalInCorrectQuestions = totalInCorrectQuestions;
      state.totalUnAttemptedQuestions = totalUnAttemptedQuestions;
      state.response = response;
    },
    setQuestionResponse: (state, action) => {
      const { questions } = state;
      const { questionId, isCorrect } = action?.payload;
      questions?.forEach((question) => {
        if (questionId === question?._id) {
          question.isCorrect = isCorrect;
          question.isAnswered = true;
        }
      });
      state.questions = questions;
    },
  },
});

export const { actions } = questionSlice;
export const selectQuestions = (state: { question: QuestionStateInterface }) =>
  state.question;
export default questionSlice.reducer;
