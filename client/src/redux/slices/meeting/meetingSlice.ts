import { createSlice } from "@reduxjs/toolkit";

const initialState: MeetingStateType = {
  masterMeeting: null,
  classMeeting: null
};

export const meetingSlice = createSlice({
  name: "meeting",
  initialState: initialState,
  reducers: {
    setMasterMeet: (state, action) => {
      state.masterMeeting = action?.payload?.data?.getMeeting?.meetingData;
    }
  },
});
export const { actions: meetingActions, reducer: meetingReducer } = meetingSlice;
export const selectMeeting = (state: { meeting: MeetingStateType }) => state.meeting;
export default meetingSlice.reducer;
