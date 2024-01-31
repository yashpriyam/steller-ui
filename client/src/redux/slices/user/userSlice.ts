import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../../utils/index";

const initialState = {
  userData: null,
  isLoggedIn: !!getCookie(process.env.REACT_APP_JWT_SECRET_KEY || ""),
  response: null,
  isAdmin: false
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
    },
    setUser: (state, action) => {
      const { userData, response, isAdmin } = action.payload;
      state.userData = userData;
      state.response = response;
      state.isAdmin = isAdmin
    },
  },
});

export const { actions } = userSlice;
export const selectUser = (state: { user: { userData: UserSchemaType, isLoggedIn: boolean, isAdmin: boolean} }) => state.user;
export default userSlice.reducer;
