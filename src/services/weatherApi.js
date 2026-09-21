/**
 * OpenWeather API Service (Free Tier: 2.5 Weather/Forecast & 1.0 Geocoding)
 */

const BASE_URL = "https://api.openweathermap.org";
const API_KEY =
  import.meta.env.VITE_OPENWEATHER_API_KEY || "3253741a4866a77b255992e2c6c3db41";

const handleResponse = async (response, context = "weather data") => {
  if (!response.ok) {
    let errorMessage = `Failed to fetch ${context} (${response.status})`;
    try {
      const errorJson = await response.json();
      if (errorJson?.message) {
        errorMessage = errorJson.message;
      }
    } catch {
      // ignore json parse error on non-json error responses
    }
    throw new Error(errorMessage);
  }
  return response.json();
};

/**
 * Get current weather for specific latitude and longitude.
 */
export const getCurrentWeather = async (lat, lon) => {
  const url = `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  return handleResponse(response, "current weather");
};

/**
 * Get 5-day / 3-hour forecast for specific latitude and longitude.
 */
export const getForecast = async (lat, lon) => {
  const url = `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  return handleResponse(response, "forecast");
};

/**
 * Direct geocoding search for city names (autocomplete suggestions).
 */
export const searchCities = async (query, limit = 10) => {
  if (!query || query.trim().length === 0) {
    return [];
  }
  const encodedQuery = encodeURIComponent(query.trim());
  const url = `${BASE_URL}/geo/1.0/direct?q=${encodedQuery}&limit=${limit}&appid=${API_KEY}`;
  const response = await fetch(url);
  return handleResponse(response, "city suggestions");
};

/**
 * Reverse geocoding to resolve coordinates to official city and country name.
 */
export const reverseGeocode = async (lat, lon, limit = 1) => {
  const url = `${BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`;
  const response = await fetch(url);
  return handleResponse(response, "reverse geocode");
};
