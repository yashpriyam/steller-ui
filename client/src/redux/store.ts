import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import questionSlice from "./slices/question/questionSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice
  },
});
