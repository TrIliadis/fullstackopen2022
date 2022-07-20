import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => setCountries(res.data));
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      find countries <input onChange={handleQuery} type="text"></input>
      <Countries query={query} countries={countries} />
    </div>
  );
}

export default App;
