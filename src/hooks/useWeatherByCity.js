import { useEffect } from "react";

export function useWeatherByCity(city, setWeather, setForecast, setLoading, setErrorMessage, API_KEY) {
  useEffect(() => {
    if (!city) return;

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
        setErrorMessage("Erro ao buscar dados do clima: " + error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, [city]);
}
