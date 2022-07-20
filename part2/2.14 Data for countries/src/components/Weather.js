import axios from "axios";
import { useEffect, useState } from "react";

const Weather = ({ country }) => {
  const [temperature, setTemperature] = useState(0);
  const [icon, setIcon] = useState("");
  const [wind, setWind] = useState(0);

  const API_KEY = process.env.REACT_APP_WEBSITE_NAME;

  useEffect(() => {
    axios
      .get(
        `  https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${API_KEY}`
      )
      .then((res) => {
        setWind(res.data.wind.speed);
        setTemperature(Math.round(res.data.main.temp - 273).toPrecision(3));
        const ic = res.data.weather[0].icon;
        setIcon(`http://openweathermap.org/img/wn/${ic}@2x.png`);
      });
  }, []);

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>temperature {temperature} Celcius</p>
      <img src={icon} alt=""></img>
      <p>wind {wind} m/s</p>
    </div>
  );
};

export default Weather;
