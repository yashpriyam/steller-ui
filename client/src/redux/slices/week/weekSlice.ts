import { createSlice } from "@reduxjs/toolkit";

const initialState: ScheduleDataStateType = {
    weekList: [],
    isScheduleDataLoading: true,
};

export const weekSlice = createSlice({
    name: "week",
    initialState: initialState,
    reducers: {
        setSchedule: (state, action) => {
            state.weekList = action.payload?.weekData;
        },
        setIsScheduleDataLoading:(state, action) => {
            state.isScheduleDataLoading = action.payload;
        }
    },
});

export const { actions } = weekSlice;
export const selectWeek = (state: { week: ScheduleDataStateType }) => state.week;
export default weekSlice.reducer;