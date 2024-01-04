import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import videosSlice from "./slices/videos/videosSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    videos: videosSlice,
  },
});
