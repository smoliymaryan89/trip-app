import axios from "axios";
import {
  CurrentWeatherResponse,
  ForecastParams,
  ForecastResponse,
} from "../types/weather";

const { VITE_BASE_URL, VITE_API_KEY } = import.meta.env;

const instance = axios.create({
  baseURL: VITE_BASE_URL,
  params: {
    key: VITE_API_KEY,
  },
});

export const getForecast = async ({ city, start, end }: ForecastParams) => {
  const { data } = await instance.get<ForecastResponse>(
    `${city}/${start}/${end}?unitGroup=metric&include=days&contentType=json`
  );

  return data;
};

export const getTodayWeather = async (city: string) => {
  const { data } = await instance.get<CurrentWeatherResponse>(
    `${city}/today?unitGroup=metric&include=days&contentType=json`
  );

  return data;
};
