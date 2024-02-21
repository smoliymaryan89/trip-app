import { NewTrip } from "../../types/trip";
import { CurrentWeatherResponse } from "../../types/weather";
import getWeatherIcon from "../../utils/helpers/getWeatherIcon";
import getWeekDay from "../../utils/helpers/getWeekDay";
import Timer from "../Timer/Timer";
import style from "./Aside.module.css";

interface AsideProps {
  currentWeather: CurrentWeatherResponse;
  currentTrip: NewTrip;
}

const Aside = ({ currentWeather, currentTrip }: AsideProps) => {
  return (
    <aside className={style.wrapper}>
      <div className={style["content-wrapper"]}>
        <p className={style.day}>
          {getWeekDay(currentWeather.days[0].datetime)}
        </p>
        <p className={style.weather}>
          {getWeatherIcon(currentWeather.days[0].icon)}
          <div style={{ display: "flex" }}>
            {currentWeather.days[0].temp}
            <span className={style.sup}>°C</span>
          </div>
        </p>
        <p className={style.address}>{currentWeather.address}</p>

        <Timer start={currentTrip.start} end={currentTrip.end} />
      </div>
    </aside>
  );
};

export default Aside;
