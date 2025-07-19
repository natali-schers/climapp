import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import "./App.css";
import { useState, useEffect } from "react";
import ForecastList from "./components/ForecastList";
import Loading from "./components/Loading";
import { parse, format } from 'date-fns';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    async function fetchInitialWeatherByCoordinates(lat, lon) {
      setLoading(true);

      try {
        const response = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&lat=${lat}&lon=${lon}`);

        const data = await response.json();

        if (data.results) {
          setWeather(data.results);
          setForecast(data.results.forecast.slice(1, 4));
        } else {
          setErrorMessage("Não foi possível obter os dados do clima.");
        }
      } catch (error) {
        setErrorMessage("Não foi possível obter os dados do clima.: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchInitialWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          setErrorMessage("Permissão de localização negada: " + error.message);
          setLoading(false);
        }
      );
    } else {
      setErrorMessage("Geolocalização não suportada pelo navegador.");
      setLoading(false);
    }

  }, []);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      try {
        const response = await fetch(`https://api.hgbrasil.com/weather?format=json-cors&key=${API_KEY}&city_name=${city}`);
        const data = await response.json();

        if (data.results) {
          setWeather(data.results);
          setForecast(data.results.forecast.slice(1, 4));
        }

      } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);

  function formatToBrazilianTime(time12h) {
    const parsed = parse(time12h, 'hh:mm a', new Date());
    return format(parsed, 'HH:mm');
  }

  return (
    <div className="app-container">
      <SearchBar onSearch={setCity} />

      {
        loading ? <Loading />
          : weather ? (
            <>
              <h1>{weather.city}</h1>
              <p>Nascer do Sol: {formatToBrazilianTime(weather.sunrise)} | Pôr do Sol: {formatToBrazilianTime(weather.sunset)}</p>

              <WeatherCard weather={weather} />
              <ForecastList forecasts={forecast} />
            </>
          )
            : (<p>Digite uma cidade para buscar o clima.</p>)
      }

    </div>
  );
}

export default App;
