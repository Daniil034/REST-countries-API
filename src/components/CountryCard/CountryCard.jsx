import { Link } from "react-router-dom";
import "./CountryCard.css";

const CountryCard = ({ country }) => {
  const name = country.name.common;
  const officialName = country.name.official;
  const population = country.population.toLocaleString('en-US');
  const region = country.region;
  const capital = country.capital;
  const flag = country.flags.svg;

  return (
    <Link to={`countries/${officialName}`} className="country-card">
      <img className="country-card__flag" src={flag} alt="flag" />
      <div className="country-card__content">
        <h2 className="country-card__name">{name}</h2>
        <div className="country-card__info">
          <p className="country-card__population"><span>Population:</span> {population}</p>
          <p className="country-card__region"><span>Region:</span> {region}</p>
          <p className="country-card__capital"><span>Capital:</span> {capital}</p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
