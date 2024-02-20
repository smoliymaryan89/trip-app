import { ChangeEvent } from "react";
import { IoSearch } from "react-icons/io5";
import style from "./SearchTrip.module.css";

interface SearchTripProps {
  value: string;
  setValue: (value: string) => void;
}

const SearchTrip = ({ value, setValue }: SearchTripProps) => {
  const handleFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={style.wrapper}>
      <IoSearch className={style["input-icon"]} size={20} />
      <input
        name="filter"
        value={value}
        onChange={handleFilter}
        className={style.input}
        type="text"
        placeholder="Search your trip"
      />
    </div>
  );
};

export default SearchTrip;
