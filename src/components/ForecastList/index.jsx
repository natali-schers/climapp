import "./styles.css";
import ForecastItem from "../ForecastItem";

const ForecastList = ({ forecasts }) => {
    return (
        <section className="forecast-list">
            {forecasts.map((forecast, index) => (
               <ForecastItem key={index} forecast={forecast}/>
            ))}
        </section>
    );
}

export default ForecastList;