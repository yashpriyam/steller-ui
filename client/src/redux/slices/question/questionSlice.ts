import { createSlice } from "@reduxjs/toolkit";

const initialState: QuestionStateInterface = {
  attemptedQuestions: [],
  nonAttemptedQuestions: [],
  totalAttemptedQuestions: 0,
  totalNonAttemptedQuestions: 0,
  totalQuestions: 0,
};

export const questionSlice = createSlice({
  name: "question",
  initialState: initialState,
  reducers: {
    setQuestions: (state, action) => {
      const {
        attemptedQuestions,
        nonAttemptedQuestions,
        totalAttemptedQuestions,
        totalNonAttemptedQuestions,
        totalQuestions,
      } = action.payload?.getAllQuestions;
      state.attemptedQuestions = attemptedQuestions;
      state.nonAttemptedQuestions = nonAttemptedQuestions;
      state.totalAttemptedQuestions = totalAttemptedQuestions;
      state.totalNonAttemptedQuestions = totalNonAttemptedQuestions;
      state.totalQuestions = totalQuestions;
    },
    setQuestionResponse: (state, action) => {
      // const { questionList } = state;
      // const { questionId, isCorrect } = action?.payload;
      // questionList.forEach(question => {
      //   if(questionId === question.id){
      //     question.isCorrect = isCorrect;
      //     question.isAnswered = true;
      //   }
      // })
      // state.questionList = [...questionList];
    },
  },
});

export const { actions } = questionSlice;
export const selectQuestions = (state: { question: QuestionStateInterface }) =>
  state.question;
export default questionSlice.reducer;
