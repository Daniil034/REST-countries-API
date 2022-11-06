import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "../../features/countries/countriesSlice";
import regionsReducer from "../../features/regions/regionsSlice";
import filtersReducer from "../../features/filters/filtersSlice";
import darkThemeReducer from "../../features/darkTheme/darkThemeSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    regions: regionsReducer,
    filters: filtersReducer,
    darkTheme: darkThemeReducer,
  },
});
