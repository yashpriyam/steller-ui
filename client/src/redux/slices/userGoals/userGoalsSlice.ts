import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userGoalsList: [],
  response: null,
  isUserGoalLoading: true,
};

export const UserGoalslice = createSlice({
  name: "userGoals",
  initialState: initialState,
  reducers: {
    setUserGoalsData: (state, action) => {
      const { userGoals, response } = action.payload;
      state.userGoalsList = userGoals;
      state.response = response;
    },
    setIsGoalsDataLoading: (state, action) => {
      state.isUserGoalLoading = action.payload;
    },
  },
});



export const { actions : userGoalsActions } = UserGoalslice;
export const selectUserGoals = (state: { userGoals : GoalsDataStateType}) => state.userGoals;
export default UserGoalslice.reducer;