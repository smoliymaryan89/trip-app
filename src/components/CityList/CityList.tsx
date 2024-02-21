import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { NewTrip } from "../../types/trip";
import style from "./CityList.module.css";
import formatDate from "../../utils/helpers/formatDate";

interface CityListProps {
  handleModal: () => void;
  trip: NewTrip[];
  handleCurrentTrip: (data: NewTrip) => void;
}

const CityList = ({ handleModal, trip, handleCurrentTrip }: CityListProps) => {
  const [isActive, setIsActive] = useState<null | number>(null);

  const handleClick = (index: number) => {
    setIsActive(index);
  };

  return (
    <div className={style.wrapper}>
      <ul className={style["city-list"]}>
        {trip.map(({ id, img, city, start, end }, index) => (
          <li
            key={id}
            className={style["city-item"]}
            onClick={() => {
              handleClick(index);
              handleCurrentTrip({ city, start, end });
            }}
          >
            <img
              src={img}
              alt={city}
              width={175}
              height={175}
              className={style["city-img"]}
            />
            <div
              className={`${style["city-content"]} ${
                index === isActive ? style["is-active"] : ""
              }`}
            >
              <h2 className={style["city-title"]}>{city}</h2>
              <p className={style.date}>
                {formatDate(start)} - {formatDate(end)}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <button type="button" className={style.btn} onClick={handleModal}>
        <div className={style["btn-content"]}>
          <FiPlus size={20} />
          Add trip
        </div>
      </button>
    </div>
  );
};

export default CityList;
