import { useState, useEffect, useCallback } from "react";
import "./App.sass";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Weather from "./components/Weather";
import Card from "./components/Card";
import Forecast from "./components/Forecast";
import getDate from "./helpers/getDate";
import Next5days from "./components/Next5days";
import {
  getCurrentWeather,
  getForecast,
  searchCities,
} from "./services/weatherApi";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);

  const fetchCityDetails = useCallback(async ({ lat, lon }) => {
    try {
      setError(null);
      const [currentData, forecastData] = await Promise.all([
        getCurrentWeather(lat, lon),
        getForecast(lat, lon),
      ]);
      setCity(currentData);
      setForecast(forecastData);
    } catch (err) {
      console.error("Error fetching weather details:", err);
      setError(err.message || "Failed to load weather data");
    }
  }, []);

  const successCallback = useCallback(
    (pos) => {
      const { latitude: lat, longitude: lon } = pos.coords;
      fetchCityDetails({ lat, lon });
    },
    [fetchCityDetails]
  );

  const errorCallback = (err) => {
    console.warn("Geolocation error:", err);
    setError("Unable to retrieve your location. Please search for a city.");
  };

  const getLocation = (e) => {
    if (e) e.preventDefault();
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  useEffect(() => {
    if (city !== "") {
      setInput("");
      setData([]);
    }
  }, [city]);

  // Debounced search for city suggestions (350ms)
  useEffect(() => {
    if (input.trim().length < 3) {
      setData([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const results = await searchCities(input.trim());
        setData(results || []);
      } catch (err) {
        console.error("Error searching cities:", err);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [input]);

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "") {
      setData([]);
    }
    setInput(val);
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
        onChange={handleChange}
      />

      {error && (
        <div style={{ color: "#ef4444", fontSize: "0.85rem", margin: "0.5rem 0", textAlign: "center" }}>
          {error}
        </div>
      )}

      {city !== "" ? (
        <>
          <Hero city={city.name} country={city.sys?.country} date={getDate()} />

          <Weather
            temperature={city.main?.temp}
            img={city?.weather?.[0]?.icon}
            weather_descriptions={city.weather?.[0]?.main}
            description={city.weather?.[0]?.description}
          />

          <Card
            visibility={city?.visibility ? city.visibility / 1000 : 0}
            wind_speed={city?.wind?.speed}
            humidity={city?.main?.humidity}
          />

          <Forecast
            next5Days={() => setIsVisible(!isVisible)}
            data={forecast?.list}
          />

          {isVisible && (
            <Next5days
              data={forecast}
              city={city.name}
              country={city.sys?.country}
              clickBack={() => setIsVisible(!isVisible)}
            />
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <p>Type the city in input</p>
          <p style={{ marginTop: "0.5rem" }}>
            <a
              href="#location"
              onClick={getLocation}
              style={{ color: "#38bdf8", textDecoration: "underline", cursor: "pointer" }}
            >
              or click here to use your location!
            </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
