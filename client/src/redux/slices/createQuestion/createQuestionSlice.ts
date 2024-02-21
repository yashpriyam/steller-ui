import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  title: [],
  answer: [],
  options: [],
  meta: {
    topic: "",
    day: null,
    week: null,
    batchCode: "",
    isActive: null,
    isArchived: null,
    type: null,
    expiresInMins: null,
    isOpenable: null,
  },
  questionTypeTags: "",
  questionType: "",
  marks: null,
  questionSubTopics:{},
};
export const createQuestionSlice = createSlice({
  name: "createQuestion",
  initialState: initialState,
  reducers: {
    updateState: (state, action) => {
      const { path, value } = action.payload;
      const keys = path.split(".");
      let currentState: any = state;
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in currentState)) {
          currentState[key] = isNaN(Number(keys[i + 1])) ? {} : [];
        }
        currentState = currentState[key];
      }
      currentState[keys[keys.length - 1]] = value;
    },
  },
});

export const {
  actions: createQuestionActions,
  reducer: createQuestionReducer,
} = createQuestionSlice;
export default createQuestionSlice.reducer;
