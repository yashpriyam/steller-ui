import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feePlans: [],
  response: null,
};

export const feePlanSlice = createSlice({
  name: "feePlans",
  initialState: initialState,
  reducers: {
    setFeePlans: (state, action) => {
      const { feePlanData, response } = action.payload;  
      state.feePlans = feePlanData;
      state.response = response;
    },
  },
});

export const { setFeePlans } = feePlanSlice.actions;
export const selectFeePlans = (state: UserAllFeePlanDataOutputType) => state.feePlans;
export default feePlanSlice.reducer;