// paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userPayments: [],
  response: null,
};

export const paymentSlice = createSlice({
  name: "userPayments",
  initialState: initialState,
  reducers: {
    setUserPayments: (state, action) => {
      const { userPaymentData, response } = action.payload.getUserPaymentsByUserId;  
      state.userPayments = userPaymentData;
      state.response = response;
    },
  },
});

export const { setUserPayments } = paymentSlice.actions;
export const selectUserPayments = (state: { userPayments: UserAllPaymentDataOutputType }) => state.userPayments;
export default paymentSlice.reducer;
