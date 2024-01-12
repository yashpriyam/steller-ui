import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../../utils/index";

const initialState = {
  user: null,
  isLoggedIn: !!getCookie(process.env.REACT_APP_JWT_SECRET_KEY || "")
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setRegisterUser: (state, action) => {
      state.user = action.payload?.registerUser;
    },
  },
});

export const { actions } = userSlice;
export const selectUser = (state: { user: RegisterUserData }) => state.user;
export default userSlice.reducer;
