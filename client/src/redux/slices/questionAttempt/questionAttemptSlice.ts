import { createSlice } from "@reduxjs/toolkit";

const initialState: QuestionAttemptStateInterface = {
  isLoading: false,
};

export const questionAttemptSlice = createSlice({
  name: "questionAttempt",
  initialState: initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    }
  },
});

export const questionAttemptActions = questionAttemptSlice.actions;
export const selectQuestionAttempt = (state: { questionAttempt: QuestionAttemptStateInterface }) => state.questionAttempt;
export default questionAttemptSlice.reducer;
