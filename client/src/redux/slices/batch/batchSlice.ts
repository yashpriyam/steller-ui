import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    batchData: null,
};

export const batchSlice = createSlice({
    name: "batch",
    initialState: initialState,
    reducers: {
        setBatchCode: (state, action) => {
            console.log({data : action.payload.batchData})
            state.batchData = action.payload?.batchData;
        },
    },
});

export const { actions } = batchSlice;
export const selectBatch = (state: { batch: {batchData : BatchSchemaType} }) => state.batch.batchData;
export default batchSlice.reducer;