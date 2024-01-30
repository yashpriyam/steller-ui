import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsersPayments: [],
  response: null,
};

export const allUserPaymentSlice = createSlice({
  name: "allUsersPayments",
  initialState: initialState,
  reducers: {
    setAllUsersPayments: (state, action) => {
      const { userPaymentData, response } = action.payload.getAllUserPayments;  
      state.allUsersPayments = userPaymentData;
      state.response = response;
    },
  },
});


export const { setAllUsersPayments } = allUserPaymentSlice.actions;
export const selectAllUsersPayments = (state: { allUsersPayments: AllUsersPaymentDataOutputType }) => state.allUsersPayments;
export default allUserPaymentSlice.reducer;
