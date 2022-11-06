import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loadCountries, selectCountries } from "./countriesSlice";
import { selectCountriesIsLoading } from "./countriesSlice";
import CountryCard from "../../components/CountryCard/CountryCard";
import "./Countries.css";

const Countries = () => {
  const dispatch = useDispatch();
  const countries = useSelector(selectCountries);
  const isLoading = useSelector(selectCountriesIsLoading);

  const handleScroll = () => {
    if (
      window.innerHeight + Math.ceil(window.pageYOffset) >=
        document.body.offsetHeight &&
      !isLoading
    ) {
      console.log("at the bottom");
      dispatch(
        loadCountries({ countryName: null, countryRegion: null, scroll: true })
      );
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <>
      {countries.map((country, index) => (
        <CountryCard country={country} key={index} />
      ))}
    </>
  );
};

export default Countries;
