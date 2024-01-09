import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user/userSlice";
import {loginReducer} from "./slices/login/loginSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    login :loginReducer,
  },
});
