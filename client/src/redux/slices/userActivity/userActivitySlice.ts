import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userActivity: null,
};

export const userActivitySlice = createSlice({
  name: "userActivity",
  initialState: initialState,
  reducers: {
    setUserActivity: (state, action) => {
      state.userActivity = action.payload?.registerUser;
    },
  },
});

export const { actions } = userActivitySlice;
export const selectUserActivity = (state: { userActivity: RegisterUserData }) => state.userActivity;
export default userActivitySlice.reducer;
