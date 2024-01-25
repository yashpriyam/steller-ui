import { createSlice } from "@reduxjs/toolkit";

const initialState : CityDataStateType = {
    cityList: [],
};

export const citySlice = createSlice({
    name: "city",
    initialState: initialState,
    reducers: {
        setCity: (state, action) => {
            state.cityList = action.payload.cityData;
        },
    },
});

export const { actions } = citySlice;
export const selectCity = (state: { city: CityDataStateType }) => state.city;
export default citySlice.reducer;