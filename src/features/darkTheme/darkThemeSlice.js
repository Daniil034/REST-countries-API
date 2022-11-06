import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('darkTheme') ? JSON.parse(localStorage.getItem('darkTheme')) : false;

export const darkTheme = createSlice({
  name: "darkTheme",
  initialState,
  reducers: {
    toggle: (state) => {
      state = !state;
      localStorage.setItem('darkTheme', JSON.stringify(state));
      return state;
    }
  },
});

export const { toggle } = darkTheme.actions;
export const selectDarkTheme = (state) => state.darkTheme;
export default darkTheme.reducer;
