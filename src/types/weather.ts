export interface ForecastParams {
  city: string;
  start: string;
  end: string;
}

export interface Day {
  datetime: string;
  icon: string;
  tempmax: number;
  tempmin: number;
}

export interface ForecastResponse {
  days: Day[];
}

export interface CurrentDay extends Day {
  temp: number;
}

export interface CurrentWeatherResponse {
  address: string;
  days: CurrentDay[];
}
