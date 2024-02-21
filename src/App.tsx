import { useEffect, useState } from "react";
import { NewTrip } from "./types/trip";
import { getForecast, getTodayWeather } from "./service/weatherApi";
import { CurrentWeatherResponse, ForecastResponse } from "./types/weather";
import { nanoid } from "nanoid";

import CityList from "./components/CityList/CityList";
import Container from "./components/Container/Container";
import SearchTrip from "./components/SearchTrip/SearchTrip";
import Title from "./components/Title/Title";
import Modal from "./components/Modal/Modal";
import useLocalStorage from "./hooks/useLocalStorage";
import selectData from "./utils/data/selectData";
import WeatherList from "./components/WeatherList/WeatherList";
import Aside from "./components/Aside/Aside";

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

  const filteredTrip = trip.filter(({ city }) =>
    city.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );

  return (
    <>
      <Container>
        <div>
          <Title />
          <SearchTrip value={filter} setValue={setFilter} />
          <CityList
            handleModal={handleModal}
            trip={filteredTrip}
            handleCurrentTrip={handleCurrentTrip}
          />
          {forecast && <WeatherList forecast={forecast} />}
        </div>

        {currentWeather && currentTrip && (
          <Aside currentWeather={currentWeather} currentTrip={currentTrip} />
        )}
      </Container>

      {isOpen && (
        <Modal handleModal={handleModal} addNewTrip={handleAddNewTrip} />
      )}
    </>
  );
};

export default App;
