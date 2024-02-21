import { ChangeEvent, FormEvent, useState } from "react";
import { NewTrip } from "../../types/trip";
import selectData from "../../utils/data/selectData";
import style from "./AddTripForm.module.css";
import getTodayAndMaxDate from "../../utils/helpers/getTodayAndMaxDate";

interface AddTripFormProps {
  handleModal: () => void;
  addNewTrip: (data: NewTrip) => void;
}

const AddTripForm = ({ handleModal, addNewTrip }: AddTripFormProps) => {
  const [city, setCity] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");

  const { todayStr, maxDateStr } = getTodayAndMaxDate();

  const handleChange = ({
    target: { name, value },
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    switch (name) {
      case "city":
        setCity(value);
        break;
      case "start":
        setStart(value);
        break;
      case "end":
        setEnd(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!city.trim() || !start.trim() || !end.trim()) return;

    addNewTrip({ city, start, end });

    handleModal();
  };

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <div className={style.wrapper}>
        <label htmlFor="city" className={style.label}>
          <span className={style["label-span"]}>*</span> City
        </label>
        <select
          name="city"
          id="city"
          onChange={handleChange}
          className={style.select}
        >
          <option value="">Please select a city</option>
          {selectData.map(({ id, city }) => (
            <option key={id} value={city}>
              {city}
            </option>
          ))}
        </select>

        <label htmlFor="start" className={style.label}>
          <span className={style["label-span"]}>*</span> Start date
        </label>
        <input
          type="date"
          onChange={handleChange}
          id="start"
          name="start"
          min={todayStr}
          max={maxDateStr}
          className={style.input}
        />

        <label htmlFor="end" className={style.label}>
          <span className={style["label-span"]}>*</span> End date
        </label>
        <input
          type="date"
          onChange={handleChange}
          id="end"
          name="end"
          min={todayStr}
          max={maxDateStr}
          className={style.input}
          style={{ marginBottom: 0 }}
        />
      </div>

      <div className={style["btn-wrapper"]}>
        <button
          type="button"
          onClick={handleModal}
          className={`${style.btn} ${style["btn-cancel"]}`}
        >
          Cancel
        </button>
        <button type="submit" className={`${style.btn} ${style["btn-save"]}`}>
          Save
        </button>
      </div>
    </form>
  );
};

export default AddTripForm;
