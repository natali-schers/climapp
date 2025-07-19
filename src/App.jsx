import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import { useWeatherByCity } from "./hooks/useWeatherByCity";
import { useWeatherByCoordinates } from "./hooks/useWeatherByCoordinates";
import { useBrazilianTimeFormat } from "./hooks/useBrazilianTimeFormat";
import "./App.css";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useWeatherByCity(city, setWeather, setForecast, setLoading, setErrorMessage, API_KEY);
  useWeatherByCoordinates(setWeather, setForecast, setLoading, setErrorMessage, API_KEY);
  const formatToBrazilianTime = useBrazilianTimeFormat();

  return (
    <div className="app-container">
      <SearchBar onSearch={setCity} />
      {loading ? (
        <Loading />
      ) : weather ? (
        <>
          <h1>{weather.city}</h1>
          <p>
            Nascer do Sol: {formatToBrazilianTime(weather.sunrise)} | Pôr do Sol: {formatToBrazilianTime(weather.sunset)}
          </p>
          <WeatherCard weather={weather} />
          <ForecastList forecasts={forecast} />
        </>
      ) : (
        <p>{errorMessage || "Digite uma cidade para buscar o clima."}</p>
      )}
    </div>
  );
}

export default App;