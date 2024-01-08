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
    setQuestionResponse: (state, action) => {
      const { questionList } = state;
      const { questionId, isCorrect } = action?.payload;
      questionList.forEach(question => {
        if(questionId === question.id){
          question.isCorrect = isCorrect;
          question.isAnswered = true;
        } 
      })
      state.questionList = [...questionList];
    }
  },
});

export const { actions } = questionSlice;
export const selectQuestions = (state: { question: QuestionStateInterface }) =>
  state.question;
export default questionSlice.reducer;
