import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const regionsSlice = createSlice({
    name: 'regions',
    initialState,
    reducers: {
        updateRegions: (state, action) => {
            return action.payload;
        }
    }
})

export const {updateRegions} = regionsSlice.actions;
export const selectRegions = state => state.regions;
export default regionsSlice.reducer;