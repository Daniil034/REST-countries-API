import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCountries } from "../../features/countries/countriesSlice";
import {
  setNameFilter,
  selectNameFilter,
  selectRegionFilter,
} from "../../features/filters/filtersSlice";
import SearchIcon from "../Icons/SearchIcon/SearchIcon";
import "./InputElement.css";

const InputElement = () => {
  const countryName = useSelector(selectNameFilter);
  const regionName = useSelector(selectRegionFilter);
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  const handleInput = (e) => {
    dispatch(setNameFilter(e.target.value));
  };

  const handleErase = () => {
    dispatch(setNameFilter(""));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const timer = setTimeout(async () => {
      dispatch(loadCountries({ countryName, countryRegion: regionName }));
    }, 1000);
    return () => clearTimeout(timer);
  }, [countryName]);

  return (
    <form className="input-block" onSubmit={(e) => e.preventDefault()}>
      <SearchIcon />
      <input
        type="text"
        className="input-block__field"
        onChange={handleInput}
        value={countryName}
        placeholder="Search for a country…"
      />
      {countryName && <div className="close" onClick={handleErase}></div>}
    </form>
  );
};

export default InputElement;
