import { useState, useEffect } from "react";
import "./App.sass";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Weather from "./components/Weather";
import Card from "./components/Card";
import Forecast from "./components/Forecast";
import getDate from "./helpers/getDate";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState("");

  const successCallback = (pos) => {
    const { latitude: lat, longitude: lon } = pos.coords;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3253741a4866a77b255992e2c6c3db41&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
      });
  };

  const errorCallback = (error) => {
    console.log(error);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const fetchData = async () => {
    const response = await fetch(
      // `http://api.positionstack.com/v1/forward?access_key=d93f994bb49b872c6e324a21dc2afb9b&query=${input}`
      `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=10&appid=3253741a4866a77b255992e2c6c3db41`
    );
    const json = await response.json();
    setData(json);
  };

  const fetchForecast = async ({ lat, lon }) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=3253741a4866a77b255992e2c6c3db41&units=metric&units=metric`
    );
    const json = await response.json();
    setForecast(json);
  };
  
  const fetchCityDetails = async ({ lat, lon }) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3253741a4866a77b255992e2c6c3db41&units=metric`
    );
    const data = await response.json();
    setCity(data);
    fetchForecast({ lat, lon });
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

  const handleClick = ({ lat, lon }) => {
    fetchCityDetails({ lat, lon });
  };

  return (
    <div className="container">
      <Navbar
        onClick={handleClick}
        filteredArr={data}
        value={input}
        onChange={(e) => handleChange(e)}
      />

      {city !== "" ? (
        <>
          <Hero city={city.name} country={city.sys?.country} date={getDate()} />

          <Weather
            temperature={city.main?.temp}
            img={city?.weather[0].icon}
            weather_descriptions={city.weather[0].main}
          />

          <Card
            visibility={city?.visibility / 1000}
            wind_speed={city?.wind?.speed}
            humidity={city?.main?.humidity}
          />

          <Forecast data={forecast?.list} />
        </>
      ) : (
        <>
          <p>Type the city in input</p>
          <p>
            <a href="#" onClick={getLocation}>
              or click here to use your location!
            </a>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
