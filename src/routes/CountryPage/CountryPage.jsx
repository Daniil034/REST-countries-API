import { useRef } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { fetchFullCountryByName } from "../../helperFunctions";
import BackIcon from "../../components/Icons/BackIcon/BackIcon";
import "./CountryPage.css";

export const loader = async ({ params }) => {
  console.log(params);
  const country = await fetchFullCountryByName(params.countryName);
  return country;
};

const CountryPage = () => {
  const loader = useLoaderData();
  const navigate = useNavigate();
  let {
    name,
    population,
    flags,
    capital,
    region,
    subregion,
    currencies,
    languages,
    tld,
  } = loader.country;
  const borderCountries = loader.borderCountries;
  const countryFlag = useRef(null);

  const handleError = () => {
    countryFlag.current.src = `${flags.png}`;
  };

  return (
    <div className="country-page">
      <div className="country-page__wrapper">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          <BackIcon />
          Back
        </button>
        <div className="country-page__content">
          <div className="country-page__flag">
            <img
              className="country-page__flag-img"
              src={flags.svg}
              ref={countryFlag}
              onError={handleError}
              alt="flag of the country"
            />
          </div>
          <div className="country-page__description">
            <h2 className="country-page__name">{name.common}</h2>
            <div className="country-page__descr-top">
              <span>Native name:</span>{" "}
              {name.nativeName[Object.keys(name.nativeName)[0]].official} <br />
              <span>Population:</span> {population.toLocaleString("en-US")}{" "}
              <br />
              <span>Region:</span> {region} <br />
              <span>Sub Region:</span> {subregion} <br />
              <span>Capital:</span> {capital.join(", ")} <br />
            </div>
            <div className="country-page__descr-bottom">
              <span>Top Level Domain:</span> {tld.join(", ")} <br />
              <span>Currencies:</span>{" "}
              {Object.keys(currencies)
                .map((currency) => currencies[currency].name)
                .join(", ")}{" "}
              <br />
              <span>Languages:</span>{" "}
              {Object.keys(languages)
                .map((languageShort) => languages[languageShort])
                .join(", ")}{" "}
            </div>
            <h3 className="country-page__borders-title">Border Countries:</h3>
            <div className="country-page__borders-container">
              {borderCountries.length ? (
                borderCountries.map((country, index) => {
                  return (
                    <Link
                      className="country-page__border-country"
                      to={`/countries/${country.name.official}`}
                      key={index}
                    >
                      {country.name.common}
                    </Link>
                  );
                })
              ) : (
                <p>No countries</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPage;
