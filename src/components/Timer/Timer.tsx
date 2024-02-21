import { useEffect, useState } from "react";
import addLeadingZero from "../../utils/helpers/addLeadingZero";
import convertMs from "../../utils/helpers/convertMs";
import style from "./Timer.module.css";

interface TimerProps {
  start: string;
  end: string;
}

const Timer = ({ start, end }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(
    new Date(end).getTime() - new Date(start).getTime()
  );

  useEffect(() => {
    const timeDifference = new Date(end).getTime() - new Date(start).getTime();
    setTimeLeft(timeDifference);

    if (timeDifference > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => prev - 1000);
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [end, start]);

  return (
    <div className={style.timer}>
      <div className={style.field}>
        <span className={style.value}>
          {addLeadingZero(convertMs(timeLeft).days)}
        </span>
        <span className={style.label}>Days</span>
      </div>
      <div className={style.field}>
        <span className={style.value}>
          {" "}
          {addLeadingZero(convertMs(timeLeft).hours)}
        </span>
        <span className={style.label}>Hours</span>
      </div>
      <div className={style.field}>
        <span className={style.value}>
          {" "}
          {addLeadingZero(convertMs(timeLeft).minutes)}
        </span>
        <span className={style.label}>Minutes</span>
      </div>
      <div className={style.field}>
        <span className={style.value}>
          {" "}
          {addLeadingZero(convertMs(timeLeft).seconds)}
        </span>
        <span className={style.label}>Seconds</span>
      </div>
    </div>
  );
};

export default Timer;
