import { useSelector } from "react-redux";
import {
  selectCountries,
  selectCountriesIsLoading,
} from "../../features/countries/countriesSlice";
import { selectNameFilter } from "../../features/filters/filtersSlice";
import InputElement from "../../components/InputElement/InputElement";
import Regions from "../../features/regions/Regions";
import Countries from "../../features/countries/Countries";
import "./AllCountriesPage.css";

const AllCountriesPage = () => {
  const isLoading = useSelector(selectCountriesIsLoading);
  const countriesArray = useSelector(selectCountries);
  const nameFilter = useSelector(selectNameFilter);

  return (
    <>
      <div className="wrapper">
        <div className="search-filter-parameters">
          <div className="search-filter-parameters__input">
            <InputElement />
          </div>
          <div className="search-filter-parameters__select">
            <Regions />
          </div>
        </div>
      </div>
      <div className="countries-wrapper">
        <Countries />
      </div>
      {isLoading ? (
        <div class="loading">
          <div class="arc"></div>
          <div class="arc"></div>
          <div class="arc"></div>
        </div>
      ) : null}
      {!isLoading && !countriesArray.length && nameFilter ? (
        <p className="no-match">No match found</p>
      ) : null}
    </>
  );
};

export default AllCountriesPage;
