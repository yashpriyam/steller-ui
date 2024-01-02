import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setItems: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { actions } = userSlice;
export const selectUser = (state: { user: any }) => state.user;
export default userSlice.reducer;
