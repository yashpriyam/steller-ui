import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tagList: [],
};

export const tagsSlice = createSlice({
    name: "tags",
    initialState: initialState,
    reducers: {
        setTag: (state, action) => {
            state.tagList = action.payload.tagData;
        },
    },
});

export const { actions } = tagsSlice;
export const selectTag = (state: { tags: {tagList : TagsSchemaType[]} }) => state.tags;
export default tagsSlice.reducer;