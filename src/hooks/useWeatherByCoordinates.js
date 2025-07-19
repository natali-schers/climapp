import { useEffect } from "react";

export function useWeatherByCoordinates(setWeather, setForecast, setLoading, setErrorMessage, API_KEY) {
  useEffect(() => {
    async function fetchWeather(lat, lon) {
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
        setErrorMessage("Erro ao obter dados por coordenadas: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude);
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
}