import { createSlice } from "@reduxjs/toolkit";

const initialState = {
};

export const questionAttemptSlice = createSlice({
  name: "questionAttempt",
  initialState: initialState,
  reducers: {
  },
});

export const { actions } = questionAttemptSlice;
export const selectQuestionAttempt = (state: { questionAttempt: {} }) => state.questionAttempt;
export default questionAttemptSlice.reducer;
