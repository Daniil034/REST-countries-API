let allCountries = [];

export const fetchCountriesInitial = async () => {
  const response = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,region"
  );
  allCountries = await response.json();
};

export const fetchCountriesByRegion = async (regionName) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${regionName}?fields=name,region`
  );
  allCountries = await response.json();
};

export const fetchCountriesByCountryName = async (countryName) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,region`
  );
  allCountries = await response.json();
};

export const fetchFullCountryByName = async (countryName) => {
  const countryRaw = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,population,region,subregion,capital,tld,currencies,languages,flags,borders`
  );
  const country = await countryRaw.json().then((country) => country[0]);
  const borderCountriesRaw = country.borders;
  console.log(borderCountriesRaw);
  const borderCountries = await Promise.all(
    borderCountriesRaw.map((countryRaw) => 
      fetch(`https://restcountries.com/v3.1/alpha/${countryRaw}?fields=name,alpha`)
    )
  ).then((responses) => {
    return Promise.all(responses.map((response) => response.json()));
  });
  console.log(borderCountries);
  return { country, borderCountries };
};

export const fetchCountries = async () => {
  const countriesToFetch = [];
  let citiesIterator = 0;

  while (citiesIterator < 20 && allCountries.length > 0) {
    const randomIndex = Math.floor(Math.random() * allCountries.length);
    countriesToFetch.push(allCountries[randomIndex]);
    allCountries.splice([randomIndex], 1);
    citiesIterator++;
  }

  const currentCountries = await Promise.all(
    countriesToFetch.map((country) =>
      fetch(
        `https://restcountries.com/v3.1/name/${country.name.common}?fullText=true&fields=name,population,region,capital,flags`
      )
    )
  ).then((responses) => {
    return Promise.all(
      responses.map(async (response) => {
        const json = await response.json();
        return json[0];
      })
    );
  });
  return currentCountries;
};

export const fetchRegions = () => {
  const regions = new Set();
  allCountries.forEach((country) => regions.add(country.region));
  return [...regions];
};

export const fetchCountriesInitialThunk = () => async () => {
  await fetchCountriesInitial();
  const countries = await fetchCountries();
  const regions = fetchRegions();
  return { countries, regions };
};

export const fetchCountriesByRegionThunk = (regionName) => async () => {
  await fetchCountriesByRegion(regionName);
  const countries = await fetchCountries();
  return countries;
};

export const fetchCountriesByCountryNameThunk = (countryName) => async () => {
  await fetchCountriesByCountryName(countryName);
  const countries = await fetchCountries();
  return countries;
};

export const fetchCountryByNameAndRegionThunk =
  (countryName, countryRegion) => async () => {
    await fetchCountriesByCountryName(countryName);
    const countries = await fetchCountries();
    const filteredCountries = countries.filter(
      (country) => country.region === countryRegion
    );
    return filteredCountries;
  };
