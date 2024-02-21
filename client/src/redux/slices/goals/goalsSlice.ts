import { createSlice } from "@reduxjs/toolkit";

const initialState: GoalsDataStateType = {
  goalsList: [],
  response: null,
  isGoalLoading: true,
};

export const goalslice = createSlice({
  name: "goals",
  initialState: initialState,
  reducers: {
    setGoalsData: (state, action) => {
      const { goals, response } = action.payload;
      state.goalsList = goals;
      state.response = response;
    },
    setIsGoalsDataLoading: (state, action) => {
      state.isGoalLoading = action.payload;
    },
  },
});



export const { actions : goalsActions } = goalslice;
export const selectGoals = (state: { goals : GoalsDataStateType}) => state.goals;
export default goalslice.reducer;