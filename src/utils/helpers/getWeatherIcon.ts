const getWeatherIcon = (icon: string) => {
  switch (icon) {
    case "rain":
      return "🌧️";
    case "partly-cloudy-day":
      return "⛅️";
    case "clear-day":
      return "☀️";
    case "snow":
      return "❄️";
    case "cloudy":
      return "☁️";
    default:
      return "💨";
  }
};

export default getWeatherIcon;
