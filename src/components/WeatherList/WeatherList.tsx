import { ForecastResponse } from "../../types/weather";
import getWeatherIcon from "../../utils/helpers/getWeatherIcon";
import getWeekDay from "../../utils/helpers/getWeekDay";
import style from "./WeatherList.module.css";

interface WeatherListProps {
  forecast: ForecastResponse;
}

const WeatherList = ({ forecast }: WeatherListProps) => {
  return (
    <>
      <h2 className={style.title}>Week</h2>

      <ul className={style["weather-list"]}>
        {forecast.days.map(({ datetime, icon, tempmax, tempmin }) => (
          <li key={datetime} className={style["weather-item"]}>
            <p className={style["weather-item-day"]}>{getWeekDay(datetime)}</p>
            <span className={style["weather-item-icon"]}>
              {getWeatherIcon(icon)}
            </span>
            <p className={style["weather-item-temp"]}>
              {Math.round(tempmax)}°/{Math.round(tempmin)}°
            </p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default WeatherList;
