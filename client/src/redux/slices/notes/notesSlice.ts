import { createSlice } from "@reduxjs/toolkit";

const initialState: NotesDataStateType = {
    noteList: [],
};

export const notesSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        setVideos: (state, action) => {
            state.noteList = action.payload?.notesData;
        },
    },
});

export const { actions } = notesSlice;
export const selectNotes = (state: { notes: NotesDataStateType }) => state.notes;
export default notesSlice.reducer;