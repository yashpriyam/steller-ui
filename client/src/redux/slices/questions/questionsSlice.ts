import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questionList: [],
};

export const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers :{
        setQuestions: (state,action) => {
            state.questionList = action.payload?.questionData;
        },
    },
});

export const { actions } = questionsSlice;
export const selectQuestions = (state: { questions: QuestionDataStateType }) => state.questions;
export default questionsSlice.reducer;