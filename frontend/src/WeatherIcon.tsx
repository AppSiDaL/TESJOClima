import { Player } from "@lottiefiles/react-lottie-player";
import cloudyHeavyRain from "./assets/icons/cloudy-heavyRain.json";
import cloudy from "./assets/icons/cloudy.json";
import cloudySnowy from "./assets/icons/cloudy-snowy.json";
import cloudyStrongWind from "./assets/icons/cloudy-strongWind.json";
import cloudyThunderstorm from "./assets/icons/cloudy-thunderstorm.json";
import dayClear from "./assets/icons/day-clear.json";
import dayCloudy from "./assets/icons/day-cloudy.json";
import dayRainy from "./assets/icons/day-rainy.json";
import daySnowy from "./assets/icons/day-snowy.json";
import nightClear from "./assets/icons/night-clear.json";
import nightCloudy from "./assets/icons/night-cloudy.json";
import nightRainy from "./assets/icons/night-rainy.json";
import nightSnowy from "./assets/icons/night-snowy.json";

interface IconMapping {
  [key: string]: object;
}

const iconMapping: IconMapping = {
  "cloudy-heavyRain": cloudyHeavyRain,
  cloudy,
  "cloudy-snowy": cloudySnowy,
  "cloudy-strongWind": cloudyStrongWind,
  "cloudy-thunderstorm": cloudyThunderstorm,
  "day-clear": dayClear,
  "day-cloudy": dayCloudy,
  "day-rainy": dayRainy,
  "day-snowy": daySnowy,
  "night-clear": nightClear,
  "night-cloudy": nightCloudy,
  "night-rainy": nightRainy,
  "night-snowy": nightSnowy,
};

interface WeatherIconProps {
  estadoTiempo: string;
}

export const WeatherIcon = ({ estadoTiempo }: WeatherIconProps) => {
  const weatherIcon = iconMapping[estadoTiempo];

  if (!weatherIcon) {
    return null;
  }

  return (
    <div className="container">
      <Player
        src={weatherIcon}
        className="player"
        loop={true}
        autoplay={true}
        style={{ height: "150px", width: "150px" }}
      />
    </div>
  );
};
