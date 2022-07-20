import Weather from "./Weather";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>

      <b>languages:</b>
      <ul>
        {Object.values(country.languages).map((language, i) => (
          <li key={i}>{language}</li>
        ))}
      </ul>
      <br />
      <img src={country.flags.png} alt="coutry flag"></img>

      <Weather country={country} />
    </div>
  );
};

export default Country;
