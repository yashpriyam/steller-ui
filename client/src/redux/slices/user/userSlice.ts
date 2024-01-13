import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../../utils/index";

const initialState = {
  userData: null,
  isLoggedIn: !!getCookie(process.env.REACT_APP_JWT_SECRET_KEY || "")
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setRegisterUser: (state, action) => {
      state.userData = action.payload?.registerUser;
    },
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action?.payload;
    }
  },
});

export const { actions } = userSlice;
export const selectUser = (state: { user: { userData: RegisterUserData, isLoggedIn: boolean } }) => state.user;
export default userSlice.reducer;
