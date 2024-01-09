import { createSlice } from "@reduxjs/toolkit";

const initialState: LoginState = {
  email: "",
  password: "",
  isOtpSend: false,
  isOtpValid: false,
  isOtpSending: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setIsOtpValid: (state, action) => {
      state.isOtpValid = action.payload;

    },
    setIsOtpSend: (state, action) => {
      state.isOtpSend = action.payload;
    },
    setIsSending: (state, action) => {
      state.isOtpSending = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    }
  },
});
export const { actions: loginAction, reducer: loginReducer } = loginSlice;
export const selectlogin = (state: { login:LoginState }) => state;
export default loginSlice.reducer;
