import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userActivity: null,
};

export const userActivitySlice = createSlice({
  name: "userActivity",
  initialState: initialState,
  reducers: {
    setUserActivity: (state, action) => {
      state.userActivity = action.payload?.upsertUserActivity;
    },
  },
});

export const { actions } = userActivitySlice;
export const selectUserActivity = (state: { userActivity: CustomResponseType }) => state.userActivity;
export default userActivitySlice.reducer;
