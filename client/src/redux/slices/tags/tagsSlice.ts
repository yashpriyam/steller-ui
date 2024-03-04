import { createSlice } from "@reduxjs/toolkit";

const initialState : TagsStateType = {
    tagsData: {},
    isTagLoading: true,
};

export const tagsSlice = createSlice({
    name: "tags",
    initialState: initialState,
    reducers: {
        setTag: (state, action) => {
            state.tagsData = action.payload.tagData;
        },
    },
});

export const { actions } = tagsSlice;
export const selectTag = (state: { tags: TagsStateType }) => state.tags;
export default tagsSlice.reducer;