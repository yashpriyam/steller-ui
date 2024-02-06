import { createSlice } from "@reduxjs/toolkit";

const initialState: VideoDataStateType = {
    videoList: [],
    isVideosLoading: true,
};

export const videosSlice = createSlice({
    name: "videos",
    initialState: initialState,
    reducers: {
        setVideos: (state, action) => {
            state.videoList = action.payload?.videoData;
        },
        setIsLoading: (state, action) => {
            state.isVideosLoading = action.payload;
        }
    },
});

export const { actions } = videosSlice;
export const selectVideos = (state: { videos: VideoDataStateType }) => state.videos;
export default videosSlice.reducer;