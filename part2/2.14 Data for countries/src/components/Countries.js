import Country from "./Country";
import { useState, useEffect } from "react";

const Countries = ({ query, countries }) => {
  const [shownCountry, setShownCountry] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.common.includes(query)
  );

  useEffect(() => {
    setShownCountry("");
  }, []);

  const handleCountryView = (i) => {
    if (shownCountry === filteredCountries[i]) return setShownCountry("");
    setShownCountry(filteredCountries[i]);
  };

  if (filteredCountries.length > 10 && query !== "")
    return <p>Too many matches, specify another filter</p>;
  else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else if (filteredCountries.length <= 10) {
    return (
      <ul>
        {filteredCountries.map((country, i) => {
          return (
            <li key={i}>
              {country.name.common}{" "}
              <button onClick={() => handleCountryView(i)}>Show</button>
            </li>
          );
        })}
        {shownCountry ? <Country country={shownCountry} /> : ""}
      </ul>
    );
  }
};

export default Countries;
