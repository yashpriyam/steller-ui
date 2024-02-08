import { createSlice } from "@reduxjs/toolkit";
import { getCookie } from "../../../utils/index";

const initialState = {
  userData: null,
  isLoggedIn: !!getCookie(process.env.REACT_APP_JWT_SECRET_KEY || ""),
  response: null,
  isAdmin: false,
  isPaidUser:null
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
      const { userData, response, isAdmin ,isPaidUser } = action.payload;
      state.userData = userData;
      state.response = response;
      state.isAdmin = isAdmin
      state.isPaidUser = isPaidUser;
    },
  },
});

export const { actions } = userSlice;
export const selectUser = (state: { user: { userData: UserSchemaType, isLoggedIn: boolean, isAdmin: boolean, isPaidUser:JSON} }) => state.user;
export default userSlice.reducer;
