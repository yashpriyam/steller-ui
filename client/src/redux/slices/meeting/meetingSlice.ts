import { createSlice } from "@reduxjs/toolkit";

const initialState: MeetingStateType = {
  meetingList: []
};

export const meetingSlice = createSlice({
  name: "meeting",
  initialState: initialState,
  reducers: {
    setMeetingList: (state, action) => {
      state.meetingList = action?.payload?.data?.getMeetingList?.meetingList;
    }
  },
});
export const { actions: meetingActions, reducer: meetingReducer } = meetingSlice;
export const selectMeeting = (state: { meeting: MeetingStateType }) => state.meeting;
export default meetingSlice.reducer;
