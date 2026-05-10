import { useState } from "react";
import "./index.css";

const API_KEY = "8481b233bf6ea11753556b5318fdb106";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getWeather() {

    if (city === "") {
      return;
    }

    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        setError("City not found.");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWeather(data);
      setLoading(false);

    } catch (err) {
      setError("City not found.");
      setLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  }

  function getWeatherEmoji(condition) {
    if (condition.includes("rain")) return "🌧️";
    if (condition.includes("cloud")) return "☁️";
    if (condition.includes("clear")) return "☀️";
    if (condition.includes("snow")) return "❄️";
    if (condition.includes("thunder")) return "⛈️";
    if (condition.includes("mist") || condition.includes("fog")) return "🌫️";
    return "🌤️";
  }

  return (
    <div className="container">

      <div className="card">

        <div className="header">
          <h1 className="title">Weather Finder</h1>
          <p className="subtitle">Get real-time weather for any city</p>
        </div>

        <div className="search-row">
          <input
            className="input"
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={function (e) { setCity(e.target.value); }}
            onKeyDown={handleKeyPress}
          />
          <button className="btn" onClick={getWeather}>
            Search
          </button>
        </div>

        {loading && (
          <div className="message-box">
            <p className="message">Loading...</p>
          </div>
        )}

        {error && (
          <div className="message-box">
            <p className="message error">❌ {error}</p>
          </div>
        )}

        {weather && (
          <div className="weather-box">

            <div className="weather-top">
              <span className="weather-emoji">
                {getWeatherEmoji(weather.weather[0].description)}
              </span>
              <h2 className="city-name">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="condition">{weather.weather[0].description}</p>
              <p className="temp">{Math.round(weather.main.temp)}°C</p>
            </div>

            <div className="details-row">
              <div className="detail">
                <span className="detail-emoji">🌡️</span>
                <span className="detail-label">Feels like</span>
                <span className="detail-value">{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail">
                <span className="detail-emoji">💧</span>
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weather.main.humidity}%</span>
              </div>
              <div className="detail">
                <span className="detail-emoji">💨</span>
                <span className="detail-label">Wind</span>
                <span className="detail-value">{weather.wind.speed} m/s</span>
              </div>
            </div>

          </div>
        )}

      </div>

      <p className="footer">Powered by OpenWeather API</p>
      <p className="footer">Made by CeeJay L. Petalvero</p>

    </div>
  );
}

export default App;