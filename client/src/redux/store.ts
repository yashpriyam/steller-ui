import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import videosSlice from "./slices/videos/videosSlice";
import notesSlice from "./slices/notes/notesSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    videos: videosSlice,
    notes: notesSlice,
  },
});
