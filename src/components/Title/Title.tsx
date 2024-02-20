import style from "./Title.module.css";

const Title = () => {
  return (
    <h1 className={style["app-title"]}>
      Weather <span className={style.title}>Forecast</span>
    </h1>
  );
};

export default Title;
