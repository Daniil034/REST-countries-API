import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  fetchCountries,
  fetchCountriesInitialThunk,
  fetchCountriesByRegionThunk,
  fetchCountriesByCountryNameThunk,
  fetchCountryByNameAndRegionThunk,
} from "../../helperFunctions";

export const loadCountries = createAsyncThunk(
  "countries/load",
  async ({ countryName, countryRegion, scroll }, thunkAPI) => {
    let countries;
    let regions;
    if (!countryName && !countryRegion && scroll) {
      countries = await fetchCountries();
      if (!countries) return;
    }
    if (!countryName && !countryRegion && !scroll) {
      thunkAPI.dispatch(resetCountries());
      const response = await thunkAPI.dispatch(fetchCountriesInitialThunk());
      countries = response.countries;
      regions = response.regions;
    }
    if (!countryName && countryRegion) {
      thunkAPI.dispatch(resetCountries());
      countries = await thunkAPI.dispatch(
        fetchCountriesByRegionThunk(countryRegion)
      );
    }
    if (countryName && !countryRegion) {
      thunkAPI.dispatch(resetCountries());
      countries = await thunkAPI.dispatch(
        fetchCountriesByCountryNameThunk(countryName)
      );
    }
    if (countryName && countryRegion) {
      thunkAPI.dispatch(resetCountries());
      countries = await thunkAPI.dispatch(
        fetchCountryByNameAndRegionThunk(countryName, countryRegion)
      );
    }
    return { countries, regions };
  },
  {
    condition: (undefined, { getState }) => {
      const { isLoading } = getState().countries;
      if (isLoading) return false;
    },
  }
);

const initialState = {
  countries: [],
  isLoading: false,
  hasError: false,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    filterCountries: (state, action) => {
      return state.countries.filter(
        (country) => country.name.common === action.payload
      );
    },
    resetCountries: (state) => {
      state.countries = [];
    },
  },
  extraReducers: {
    [loadCountries.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [loadCountries.fulfilled]: (state, action) => {
      state.countries.push(...action.payload.countries);
      state.isLoading = false;
      state.hasError = false;
    },
    [loadCountries.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

export const { resetCountries } = countriesSlice.actions;
export const selectCountries = (state) => state.countries.countries;
export const selectCountriesIsLoading = (state) => state.countries.isLoading;
export const selectCountriesHasError = (state) => state.countries.hasError;
export default countriesSlice.reducer;
