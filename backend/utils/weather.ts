import { TesjoValues, climaticStatesValues } from "../types";


export const determineWeatherState = (
  weatherData: TesjoValues
): climaticStatesValues["name"] => {
  const { temperatura, lluvia, luz, hora } = weatherData;

  const isDaytime = Number(hora) >= 6 && Number(hora) <= 18;
  const isRaining = lluvia > 0;
  const isCloudy = luz < 50; // Suponemos que un nivel de luz bajo indica nubes
  const isSnowing = temperatura < 0 && isRaining; // Suponemos que si está lloviendo y la temperatura es menor a 0, está nevando

  if (isDaytime) {
    if (isCloudy) {
      if (isRaining) {
        return "day-rainy";
      } else if (isSnowing) {
        return "day-snowy";
      } else {
        return "day-cloudy";
      }
    } else {
      return "day-clear";
    }
  } else {
    if (isCloudy) {
      if (isRaining) {
        return "night-rainy";
      } else if (isSnowing) {
        return "night-snowy";
      } else {
        return "night-cloudy";
      }
    } else {
      return "night-clear";
    }
  }
};

interface WeatherData {
  luz: number;
  humedad: number;
}

export const calculateRainProbability = (weatherData: WeatherData): number => {
  const { luz, humedad } = weatherData;

  const isCloudy = luz < 50; // Suponemos que un nivel de luz bajo indica nubes
  const isHumid = humedad > 80; // Suponemos que una humedad alta aumenta la probabilidad de lluvia

  if (isCloudy) {
    if (isHumid) {
      return 90; // 90% de probabilidad de lluvia si está nublado y la humedad es alta
    } else {
      return 50; // 50% de probabilidad de lluvia si está nublado
    }
  } else {
    return 0; // 0% de probabilidad de lluvia si no está nublado
  }
};
