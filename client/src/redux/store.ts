import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import questionSlice from "./slices/question/questionSlice";
import questionAttemptSlice from "./slices/questionAttempt/questionAttemptSlice";
import videosSlice from "./slices/videos/videosSlice";
import notesSlice from "./slices/notes/notesSlice";
import {loginReducer} from "./slices/login/loginSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    question: questionSlice,
    questionAttempt: questionAttemptSlice,
    videos: videosSlice,
    notes: notesSlice,
    login :loginReducer,
  },
});
