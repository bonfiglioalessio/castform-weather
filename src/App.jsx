import { useState, useEffect } from "react";
import "./App.sass";
import Navbar from "./components/Navbar";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");

  const fetchData = async () => {
    const response = await fetch(
      `http://api.positionstack.com/v1/forward?access_key=d93f994bb49b872c6e324a21dc2afb9b&query=${input}`
    );
    const json = await response.json();
    const data = json.data;
    setData(data);
  };

  const fetchCityDetails = async (name) => {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=bd72e63b98d7da5072feefcbd8b5c34f&query=${name}`
    );
    const data = await response.json();
    setCity(data);
  };

  useEffect(() => {
    if (city !== "") {
      setInput("");
      setData([]);
    }
  }, [city]);

  useEffect(() => {
    if (input.length >= 3) {
      fetchData();
    }
  }, [input]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setData([]);
    }
    setInput(e.target.value);
  };

  const handleClick = ({ name }) => {
    fetchCityDetails(name);
  };

  const weather = city.current;
  const location = city.location;

  console.log("weather", weather);
  console.log("location", location);

  return (
    <div className="container">
      <Navbar
        onClick={handleClick}
        filteredArr={data}
        value={input}
        onChange={(e) => handleChange(e)}
      />

      <h1 style={{ marginTop: "200px" }}>{location?.name}</h1>
      <h2>{weather?.temperature}°</h2>
    </div>
  );
}

export default App;
