import { createSlice } from "@reduxjs/toolkit";
const openWindowType = {
  enableUserSelection: false,
  isEditable: false,
  predefinedCode: "",
  title: "",
};
const option = {
  text: "",
  imageUrl: "",
  iframe: "",
  codeBlock: {
    enableCodeBlock: false,
    configuration: {
      showOutputWindow: false,
      showSplitWindow: false,
      openWindows: [openWindowType,openWindowType,openWindowType
      ],
    },
  },
};

const initialState = {
  title: [],
  answer: [],
  options: [],
  meta: {
    topic: "",
    day: 0,
    week: 0,
    batchCode: "",
    isActive: false,
    isArchived: false,
    type: "",
    expiresInMins: 0,
    isOpenable: false,
  },
  questionType: "",
  marks: 1,
};
export const createQuestionSlice = createSlice({
  name: "createQuestion",
  initialState: initialState,
  reducers: {
    updateState: (state, action) => {
          const { path, value } = action.payload;
          console.log({path},{state});
          
      const keys = path.split(".");
      let currentState: any = state;
      //   console.log(path, value);

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in currentState)) {
          currentState[key] = isNaN(Number(keys[i + 1])) ? {} : [];
        }
        currentState = currentState[key];
      }

      // Set the value at the specified path
      currentState[keys[keys.length - 1]] = value;
          console.log({ currentState });
    },

  },
});

export const {
  actions: createQuestionActions,
  reducer: createQuestionReducer,
} = createQuestionSlice;
export default createQuestionSlice.reducer;
