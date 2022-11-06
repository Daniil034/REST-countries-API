import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: '',
    region: ''
}

export const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setNameFilter: (state, action) => {
            state.name = action.payload;
        },
        setRegionFilter: (state, action) => {
            state.region = action.payload;
        }
    }
})

export const {setNameFilter, setRegionFilter} = filtersSlice.actions;
export const selectNameFilter = (state) => state.filters.name;
export const selectRegionFilter = (state) => state.filters.region;
export default filtersSlice.reducer;