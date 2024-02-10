import { createSlice } from "@reduxjs/toolkit";

const initialState: NotesDataStateType = {
    noteList: [],
    isNotesLoading: true,
};

export const notesSlice = createSlice({
    name: "notes",
    initialState: initialState,
    reducers: {
        setNotes: (state, action) => {
            state.noteList = action.payload?.notesData;
        },
        setIsNotesLoading: (state, action) => {
            state.isNotesLoading = action.payload;
        }
    },
});

export const { actions } = notesSlice;
export const selectNotes = (state: { notes: NotesDataStateType }) => state.notes;
export default notesSlice.reducer;