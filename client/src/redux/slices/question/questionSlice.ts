import { createSlice } from "@reduxjs/toolkit";

const initialState: QuestionStateInterface = {
  questionList: [],
};

export const questionSlice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questionList = action.payload?.getAllQuestions?.questionData || [];
    },
  },
});

export const { actions } = questionSlice;
export const selectQuestions = (state: { question: QuestionStateInterface }) =>
  state.question;
export default questionSlice.reducer;
