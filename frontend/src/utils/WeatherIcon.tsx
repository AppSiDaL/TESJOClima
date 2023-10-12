import { Player } from "@lottiefiles/react-lottie-player";
import cloudyHeavyRain from "../assets/icons/cloudy-heavyRain.json";
import cloudy from "../assets/icons/cloudy.json";
import cloudySnowy from "../assets/icons/cloudy-snowy.json";
import cloudyStrongWind from "../assets/icons/cloudy-strongWind.json";
import cloudyThunderstorm from "../assets/icons/cloudy-thunderstorm.json";
import dayClear from "../assets/icons/day-clear.json";
import dayCloudy from "../assets/icons/day-cloudy.json";
import dayRainy from "../assets/icons/day-rainy.json";
import daySnowy from "../assets/icons/day-snowy.json";
import nightClear from "../assets/icons/night-clear.json";
import nightCloudy from "../assets/icons/night-cloudy.json";
import nightRainy from "../assets/icons/night-rainy.json";
import nightSnowy from "../assets/icons/night-snowy.json";
import humedad from "../assets/icons/confort/humidity.json";
import lluvia from "../assets/icons/confort/rain.json";
import luz from "../assets/icons/confort/light.json";
import presion from "../assets/icons/confort/pressure.json";
import viento from "../assets/icons/confort/wind.json";
import direccion from "../assets/icons/confort/direccion.json";
import loading from "../assets/icons/loading.json";
import compass from "../assets/icons/compass.json";

import { Umbrella } from "react-bootstrap-icons";
import { Droplet } from "react-bootstrap-icons";
import { Lightbulb } from "react-bootstrap-icons";
import { ChevronDoubleDown } from "react-bootstrap-icons";
import { Wind } from "react-bootstrap-icons";
import { Compass } from "react-bootstrap-icons";
import { Icon } from "react-bootstrap-icons";
import React, { useRef, useEffect } from "react";

import SunTray from "../assets/icons/SunriseSunset.json";
import AirQuality from "../assets/icons/airQuality.json";
import lottie from "lottie-web";

import GaugeChart from "../charts/GaugeChart";

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
  humedad,
  lluvia,
  luz,
  presion,
  viento,
  direccion,
  loading,
  compass,
};
const miniIConMaping: { [key: string]: Icon } = {
  humedad: Droplet,
  lluvia: Umbrella,
  luz: Lightbulb,
  presion: ChevronDoubleDown,
  viento: Wind,
  direccion: Compass,
};

interface WeatherIconProps {
  estadoTiempo: string;
  width: string;
  height: string;
}
interface miniWeatherIconProps {
  value: string;
}

export const MiniWeatherIcon = ({ value }: miniWeatherIconProps) => {
  const WeatherIcon = miniIConMaping[value];

  if (!WeatherIcon) {
    return null;
  }

  return (
    <div className="container">
      {React.createElement(WeatherIcon, { width: "32", height: "32" })}
    </div>
  );
};

export const WeatherIcon = ({
  estadoTiempo,
  width,
  height,
}: WeatherIconProps) => {
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
        style={{ height, width }}
      />
    </div>
  );
};

export const SunriseSunsetIcon = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: SunTray,
      });

      animation.goToAndStop(frameNumber, true);

      return () => {
        animation.destroy();
      };
    }
  }, []);

  const frameNumber = 2000;
  return (
    <div ref={containerRef} style={{ width: "160px", height: "80px" }}></div>
  );
};

interface AirQualityIcon {
  value: number;
}

export const AirQualityIcon = ({ value }: AirQualityIcon) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: AirQuality,
      });

      animation.goToAndStop(frameNumber, true);

      return () => {
        animation.destroy();
      };
    }
  });

  const frameNumber = value;
  return (
    <div ref={containerRef} style={{ width: "160px", height: "80px" }}></div>
  );
};

const chartMapping: { [key: string]: (() => JSX.Element) | object } = {
  humedad: () => (
    <GaugeChart color="#224D99" name="Humedad" valueName="Humedad" value={50} />
  ),
  lluvia: () => (
    <GaugeChart color="#224D99" name="Lluvia" valueName="Lluvia" value={0} />
  ),
  luz: () => (
    <GaugeChart color="#DBE032" name="Luz" valueName="Luz" value={45} />
  ),
  presion: () => (
    <GaugeChart color="#941230" name="Presion" valueName="Presion" value={20} />
  ),
  viento: () => (
    <GaugeChart color="#2C64A1" name="Viento" valueName="Viento" value={50} />
  ),
  direccion: () => (
    <WeatherIcon estadoTiempo="compass" height="300px" width="200px" />
  ),
};

interface GetChartProps {
  value: string;
}

export const GetChart = ({ value }: GetChartProps) => {
  const Chart = chartMapping[value];

  if (!Chart) {
    return null;
  }

  if (typeof Chart === "function") {
    return Chart(); // Llama a la función para obtener el componente
  }

  // Si Chart no es una función, es un objeto y puedes devolverlo directamente
  return Chart;
};
