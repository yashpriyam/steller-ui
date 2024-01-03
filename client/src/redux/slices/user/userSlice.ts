import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
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
