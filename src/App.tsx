import { useEffect, useState } from "react";
import { NewTrip } from "./types/trip";
import { getForecast, getTodayWeather } from "./service/weatherApi";
import { CurrentWeatherResponse, ForecastResponse } from "./types/weather";
import { nanoid } from "nanoid";
import { Toaster } from "react-hot-toast";

import CityList from "./components/CityList/CityList";
import Container from "./components/Container/Container";
import SearchTrip from "./components/SearchTrip/SearchTrip";
import Title from "./components/Title/Title";
import Modal from "./components/Modal/Modal";
import useLocalStorage from "./hooks/useLocalStorage";
import selectData from "./utils/data/selectData";
import WeatherList from "./components/WeatherList/WeatherList";
import Aside from "./components/Aside/Aside";
import "./App.css";

const App = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [trip, setTrip] = useLocalStorage<NewTrip[]>("trip", [
    {
      id: nanoid(),
      city: "Berlin",
      img: "https://media.cntraveler.com/photos/5b914e80d5806340ca438db1/1:1/w_2250,h_2250,c_limit/BrandenburgGate_2018_GettyImages-549093677.jpg",
      start: "2023-02-16",
      end: "2023-02-20",
    },
  ]);
  const [filter, setFilter] = useState<string>("");
  const [currentTrip, setCurrentTrip] = useState<NewTrip | null>(null);
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);
  const [filteredTrip, setFilteredTrip] = useState<NewTrip[] | null>(null);

  useEffect(() => {
    if (!currentTrip) {
      return;
    }

    (async () => {
      try {
        const data = await getForecast(currentTrip);
        setForecast(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentTrip]);

  useEffect(() => {
    if (!currentTrip?.city) {
      return;
    }

    (async () => {
      try {
        const data = await getTodayWeather(currentTrip.city);

        setCurrentWeather(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentTrip?.city]);

  useEffect(() => {
    const filteredTripArr = trip.filter(({ city }) =>
      city.toLowerCase().trim().includes(filter.toLowerCase().trim())
    );
    setFilteredTrip(filteredTripArr);
  }, [filter, trip]);

  const handleModal = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAddNewTrip = (data: NewTrip) => {
    const city = selectData.find((item) => item.city === data.city);

    const newTrip = {
      id: nanoid(),
      ...data,
      img: city?.img,
    };

    setTrip((prev) => [...prev, newTrip]);
  };

  const handleCurrentTrip = (data: NewTrip) => {
    setCurrentTrip(data);
  };

  const handleSort = () => {
    if (filteredTrip) {
      const sortedTrip = [...filteredTrip].sort(
        (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
      );
      setFilteredTrip(sortedTrip);
    }
  };

  return (
    <>
      <Container>
        <div>
          <Title />
          <div className={"app-wrapper"}>
            <SearchTrip value={filter} setValue={setFilter} />
            <button className="sort-btn" onClick={handleSort}>
              Sort by date start
            </button>
          </div>
          {filteredTrip && (
            <CityList
              handleModal={handleModal}
              trip={filteredTrip}
              handleCurrentTrip={handleCurrentTrip}
            />
          )}
          {forecast && <WeatherList forecast={forecast} />}
        </div>

        {currentWeather && currentTrip && (
          <Aside currentWeather={currentWeather} currentTrip={currentTrip} />
        )}
      </Container>

      {isOpen && (
        <Modal handleModal={handleModal} addNewTrip={handleAddNewTrip} />
      )}

      <Toaster position="bottom-center" toastOptions={{ duration: 3000 }} />
    </>
  );
};

export default App;
