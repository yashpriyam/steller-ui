import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userCode: [],
    isSetUserCodeLoading: true,
    isUserSubmittedCodeLoading: false
};

export const userCodeSlice = createSlice({
    name: "userCode",
    initialState: initialState,
    reducers: {
        setUserCode: (state, action) => {
            state.userCode = action.payload?.data;
            state.isSetUserCodeLoading = false;
        },
        setCodeSubmittedLoading: (state, action) => {
            state.isUserSubmittedCodeLoading = action.payload
        }
    },
});

export const { actions: userCodeAction, reducer: userCodeReducer } = userCodeSlice;
export const selectUserCode = (state: { userCode: UserCodeStateType }) => state.userCode;
export default userCodeSlice.reducer;