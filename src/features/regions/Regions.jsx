import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { selectRegions } from "./regionsSlice";
import { setRegionFilter, selectRegionFilter, selectNameFilter } from "../filters/filtersSlice";
import { loadCountries } from "../countries/countriesSlice";
import './Regions.css';

const Regions = () => {
  const regions = useSelector(selectRegions);
  const dispatch = useDispatch();
  const countryName = useSelector(selectNameFilter);
  const countryRegion = useSelector(selectRegionFilter);
  const firstRender = useRef(true);

  const handleChange = (regionName) => {
    if (!regionName) return;
    if (regionName === '0') regionName = '';
    dispatch(setRegionFilter(regionName));
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return
    }
    const promise = dispatch(loadCountries({countryName, countryRegion}));
    return () => promise.abort();
  }, [countryRegion])

  return (
    <form>
        <select className="select" onChange={(e) => handleChange(e.currentTarget.value)}>
            <option value='0' hidden={countryRegion === ''}>Filter by Region</option>
            {regions.map((region, index) => <option key={index} value={region} selected={countryRegion === region} hidden={countryRegion === region}>{region}</option> )}
        </select>
    </form>
  )
}

export default Regions