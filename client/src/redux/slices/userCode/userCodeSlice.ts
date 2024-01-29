import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userCode: [],
    isLoading: true
};

export const userCodeSlice = createSlice({
    name: "userCode",
    initialState: initialState,
    reducers: {
        setUserCode: (state, action) => {
            console.log(action.payload.data);
            state.userCode = action.payload?.data;
            state.isLoading = false;
        },
    },
});

export const { actions } = userCodeSlice;
export const selectUserCode = (state: { userCode: UserCodeStateType }) => state.userCode;
export default userCodeSlice.reducer;