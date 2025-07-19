import "./styles.css";

const ForecastItem = ({ forecast }) => {
  return (
    <div className="forecast-item">
      <p className="forecast-day">
         {forecast.date}
      </p>
      <img src={`./icons-weather/${forecast.condition}.svg`} alt={forecast.description} />
      <p className="forecast-temp">
        {forecast.min}/{forecast.max}°
      </p>
    </div>
  );
};

export default ForecastItem;