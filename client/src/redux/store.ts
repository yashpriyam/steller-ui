import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import questionSlice from "./slices/question/questionSlice";
import questionAttemptSlice from "./slices/questionAttempt/questionAttemptSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    questionAttempt: questionAttemptSlice,
  },
});
