import { useState, useEffect, useCallback, useMemo } from "react";
import "./App.sass";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Forecast from "./components/Forecast";
import DailyForecast from "./components/DailyForecast";
import Card from "./components/Card";
import WeatherParticles from "./components/WeatherParticles";
import PokedexModal from "./components/PokedexModal";
import { getCastformForm } from "./helpers/castformUtils";
import {
  getCurrentWeather,
  getForecast,
  searchCities,
  reverseGeocode,
} from "./services/weatherApi";

function App() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPokedexOpen, setIsPokedexOpen] = useState(false);

  const fetchCityDetails = useCallback(
    async ({ lat, lon, cityName, countryName }) => {
      try {
        setIsLoading(true);
        setError(null);
        const [currentData, forecastData] = await Promise.all([
          getCurrentWeather(lat, lon),
          getForecast(lat, lon),
        ]);

        let resolvedCityName = cityName;
        let resolvedCountry = countryName;

        if (!resolvedCityName) {
          try {
            const revResults = await reverseGeocode(lat, lon);
            if (revResults && revResults.length > 0 && revResults[0].name) {
              resolvedCityName = revResults[0].name;
              if (revResults[0].country) {
                resolvedCountry = revResults[0].country;
              }
            }
          } catch (e) {
            console.warn("Reverse geocode fallback error:", e);
          }
        }

        if (resolvedCityName) {
          currentData.name = resolvedCityName;
        }
        if (resolvedCountry && currentData.sys) {
          currentData.sys.country = resolvedCountry;
        }

        setCity(currentData);
        setForecast(forecastData);
      } catch (err) {
        console.error("Error fetching weather details:", err);
        setError(err.message || "Failed to load weather data");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

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

  const handleClick = ({ lat, lon, cityName, countryName }) => {
    fetchCityDetails({ lat, lon, cityName, countryName });
  };

  // Determine dynamic visionOS atmospheric theme
  const weatherTheme = useMemo(() => {
    if (!city) return "theme-clear";
    const icon = city?.weather?.[0]?.icon || "";
    const condition = (city?.weather?.[0]?.main || "").toLowerCase();

    if (icon.includes("n")) return "theme-night";
    if (condition.includes("rain") || condition.includes("drizzle")) return "theme-rain";
    if (condition.includes("thunderstorm")) return "theme-thunderstorm";
    if (condition.includes("snow")) return "theme-snow";
    if (condition.includes("cloud")) return "theme-clouds";
    if (condition.includes("mist") || condition.includes("fog")) return "theme-mist";
    return "theme-clear";
  }, [city]);

  // Compute today's High and Low from the forecast
  const todayRange = useMemo(() => {
    if (!forecast?.list || forecast.list.length === 0) {
      return {
        high: city?.main?.temp_max ? Math.round(city.main.temp_max) : null,
        low: city?.main?.temp_min ? Math.round(city.main.temp_min) : null,
      };
    }
    const todayStr = new Date().toISOString().slice(0, 10);
    const todayItems = forecast.list.filter((i) => i.dt_txt?.startsWith(todayStr));
    const itemsToScan = todayItems.length > 0 ? todayItems : forecast.list.slice(0, 8);
    const temps = itemsToScan.map((i) => i.main.temp);
    return {
      high: Math.round(Math.max(...temps, city?.main?.temp ?? 0)),
      low: Math.round(Math.min(...temps, city?.main?.temp ?? 0)),
    };
  }, [forecast, city]);

  // Active Castform Form based on live weather data
  const currentCastformForm = useMemo(() => {
    return getCastformForm(
      city?.weather?.[0]?.description,
      city?.weather?.[0]?.icon,
      city?.main?.temp
    );
  }, [city]);

  return (
    <div className={`app_viewport ${weatherTheme}`}>
      {/* Ambient Canvas Weather Particles */}
      <WeatherParticles
        theme={weatherTheme}
        windSpeed={city?.wind?.speed || 10}
      />

      <div className="ambient_canvas" aria-hidden="true">
        <div className="ambient_orb orb_1" />
        <div className="ambient_orb orb_2" />
        <div className="ambient_orb orb_3" />
      </div>

      <div className="container app_main_container">
        <Navbar
          onClick={handleClick}
          onLocate={getLocation}
          filteredArr={data}
          value={input}
          onChange={handleChange}
        />

        {error && (
          <div className="glass_error_banner">
            <span>{error}</span>
          </div>
        )}

        {city !== "" ? (
          <main className="content_stack">
            <div className="dashboard_left_col">
              {/* 1. Compact Apple Weather Hero Glass Card */}
              <div className="layout_section_hero">
                <Hero
                  city={city.name}
                  country={city.sys?.country}
                  temperature={Math.round(city.main?.temp)}
                  description={city.weather?.[0]?.description}
                  high={todayRange.high}
                  low={todayRange.low}
                  img={city?.weather?.[0]?.icon}
                  feels_like={city?.main?.feels_like ? Math.round(city.main.feels_like) : null}
                  onOpenPokedex={() => setIsPokedexOpen(true)}
                />
              </div>

              {/* 2. Embedded 7-Day (1-Week) Forecast Card with Apple Range Bars */}
              <div className="layout_section_daily">
                <DailyForecast
                  data={forecast?.list}
                  currentTemp={Math.round(city.main?.temp)}
                />
              </div>
            </div>

            <div className="dashboard_right_col">
              {/* 3. Hourly Forecast with Tabs (Rail & Trend Chart) */}
              <div className="layout_section_hourly">
                <Forecast data={forecast?.list} />
              </div>

              {/* 4. Compact Bento Grid (Wind Compass, Humidity Ring, Sun Arc, Visibility) */}
              <div className="layout_section_bento">
                <Card
                  wind_speed={Math.round((city?.wind?.speed || 0) * 3.6)}
                  wind_deg={city?.wind?.deg || 0}
                  humidity={city?.main?.humidity}
                  visibility={city?.visibility ? Math.round(city.visibility / 100) / 10 : 0}
                  feels_like={city?.main?.feels_like ? Math.round(city.main.feels_like) : null}
                  pressure={city?.main?.pressure}
                  sunrise={city?.sys?.sunrise}
                  sunset={city?.sys?.sunset}
                  temp={Math.round(city.main?.temp)}
                />
              </div>
            </div>
          </main>
        ) : (
          <div className="empty_glass_stage">
            <div className="glass_card empty_welcome_card">
              <div className="welcome_castform_badge">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/351.png"
                  alt="Castform"
                  className="welcome_castform_img"
                  width={84}
                  height={84}
                />
              </div>
              <h2>Castform Weather</h2>
              <p>The Weather Pokémon (#351) is ready! Tap below or search any city to watch Castform transform with live atmospheric conditions.</p>

              <button
                type="button"
                className="glass_cta_button"
                onClick={getLocation}
                disabled={isLoading}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="3 11 22 2 13 21 11 13 3 11" />
                </svg>
                <span>{isLoading ? "Locating..." : "Use Current Location"}</span>
              </button>

              <div className="quick_cities_group">
                <span className="quick_label">Quick Cities</span>
                <div className="quick_tags">
                  {[
                    { name: "Milan", country: "IT", lat: 45.4642, lon: 9.19 },
                    { name: "Rome", country: "IT", lat: 41.8933, lon: 12.4829 },
                    { name: "London", country: "GB", lat: 51.5074, lon: -0.1278 },
                    { name: "New York", country: "US", lat: 40.7128, lon: -74.006 },
                    { name: "Tokyo", country: "JP", lat: 35.6828, lon: 139.7595 },
                  ].map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className="glass_quick_tag"
                      onClick={() =>
                        fetchCityDetails({
                          lat: c.lat,
                          lon: c.lon,
                          cityName: c.name,
                          countryName: c.country,
                        })
                      }
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Castform #351 VisionOS Pokédex Modal */}
      <PokedexModal
        isOpen={isPokedexOpen}
        onClose={() => setIsPokedexOpen(false)}
        currentForm={currentCastformForm}
      />
    </div>
  );
}

export default App;
