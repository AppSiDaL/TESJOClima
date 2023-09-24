import Header from "./components/Header";
import TodayScroll from "./components/TodayScroll";
import { DatosClimaticos, DatosClimaticosSemanales } from "../../Types";
import WeekScroll from "./components/WeekScroll";
import WeekChart from "../../charts/WeekChart";
import DataCards from "./components/DataCards";
import Theme from "../../utils/Theme";
const LangingPage = () => {
  const datosClima: DatosClimaticos[] = [
    {
      hora: "00:00",
      temperatura: 20,
      estado_tiempo: "cloudy-heavyRain",
      porcentaje_lluvia: 80,
      confort: {
        humedad: 50,
        lluvia: 10,
        luz: 55,
        presion: 748,
        viento: 5,
        direccion: 124,
      },
    },
    {
      hora: "01:00",
      temperatura: 19,
      estado_tiempo: "cloudy",
      porcentaje_lluvia: 60,
      confort: {
        humedad: 55,
        lluvia: 15,
        luz: 50,
        presion: 747,
        viento: 6,
        direccion: 128,
      },
    },
    {
      hora: "02:00",
      temperatura: 18,
      estado_tiempo: "cloudy-snowy",
      porcentaje_lluvia: 70,
      confort: {
        humedad: 60,
        lluvia: 20,
        luz: 45,
        presion: 746,
        viento: 7,
        direccion: 132,
      },
    },
    {
      hora: "03:00",
      temperatura: 17,
      estado_tiempo: "cloudy-strongWind",
      porcentaje_lluvia: 40,
      confort: {
        humedad: 65,
        lluvia: 25,
        luz: 40,
        presion: 745,
        viento: 8,
        direccion: 136,
      },
    },
    {
      hora: "04:00",
      temperatura: 16,
      estado_tiempo: "cloudy-thunderstorm",
      porcentaje_lluvia: 90,
      confort: {
        humedad: 70,
        lluvia: 30,
        luz: 35,
        presion: 744,
        viento: 9,
        direccion: 140,
      },
    },
    {
      hora: "05:00",
      temperatura: 16,
      estado_tiempo: "day-clear",
      porcentaje_lluvia: 0,
      confort: {
        humedad: 75,
        lluvia: 35,
        luz: 30,
        presion: 743,
        viento: 10,
        direccion: 144,
      },
    },
    {
      hora: "06:00",
      temperatura: 17,
      estado_tiempo: "day-cloudy",
      porcentaje_lluvia: 20,
      confort: {
        humedad: 80,
        lluvia: 40,
        luz: 25,
        presion: 742,
        viento: 11,
        direccion: 148,
      },
    },
    {
      hora: "07:00",
      temperatura: 18,
      estado_tiempo: "day-rainy",
      porcentaje_lluvia: 50,
      confort: {
        humedad: 85,
        lluvia: 45,
        luz: 20,
        presion: 741,
        viento: 12,
        direccion: 152,
      },
    },
    {
      hora: "08:00",
      temperatura: 19,
      estado_tiempo: "day-snowy",
      porcentaje_lluvia: 30,
      confort: {
        humedad: 90,
        lluvia: 50,
        luz: 15,
        presion: 740,
        viento: 13,
        direccion: 156,
      },
    },
    {
      hora: "09:00",
      temperatura: 20,
      estado_tiempo: "night-clear",
      porcentaje_lluvia: 0,
      confort: {
        humedad: 95,
        lluvia: 55,
        luz: 10,
        presion: 739,
        viento: 14,
        direccion: 160,
      },
    },
    {
      hora: "10:00",
      temperatura: 22,
      estado_tiempo: "night-cloudy",
      porcentaje_lluvia: 10,
      confort: {
        humedad: 100,
        lluvia: 60,
        luz: 5,
        presion: 738,
        viento: 15,
        direccion: 164,
      },
    },
    {
      hora: "11:00",
      temperatura: 24,
      estado_tiempo: "night-rainy",
      porcentaje_lluvia: 40,
      confort: {
        humedad: 100,
        lluvia: 60,
        luz: 5,
        presion: 737,
        viento: 16,
        direccion: 168,
      },
    },
    {
      hora: "12:00",
      temperatura: 26,
      estado_tiempo: "night-snowy",
      porcentaje_lluvia: 60,
      confort: {
        humedad: 100,
        lluvia: 60,
        luz: 5,
        presion: 736,
        viento: 17,
        direccion: 172,
      },
    },
  ];

  const actuallValues: DatosClimaticos = {
    hora: "12:00",
    temperatura: 26,
    estado_tiempo: "night-snowy",
    porcentaje_lluvia: 60,
    confort: {
      humedad: 100,
      lluvia: 60,
      luz: 5,
      presion: 736,
      viento: 17,
      direccion: 172,
    },
  };

  const climaSemanal: DatosClimaticosSemanales[] = [
    {
      dia: "Lunes",
      fecha: "2023-10-02",
      pronostico: "day-clear",
      temperatura_minima: 18,
      temperatura_maxima: 28,
    },
    {
      dia: "Martes",
      fecha: "2023-10-03",
      pronostico: "day-cloudy",
      temperatura_minima: 17,
      temperatura_maxima: 26,
    },
    {
      dia: "Miércoles",
      fecha: "2023-10-04",
      pronostico: "day-rainy",
      temperatura_minima: 16,
      temperatura_maxima: 22,
    },
    {
      dia: "Jueves",
      fecha: "2023-10-05",
      pronostico: "day-cloudy",
      temperatura_minima: 17,
      temperatura_maxima: 27,
    },
    {
      dia: "Viernes",
      fecha: "2023-10-06",
      pronostico: "day-clear",
      temperatura_minima: 19,
      temperatura_maxima: 30,
    },
    {
      dia: "Sábado",
      fecha: "2023-10-07",
      pronostico: "day-clear",
      temperatura_minima: 20,
      temperatura_maxima: 32,
    },
    {
      dia: "Domingo",
      fecha: "2023-10-08",
      pronostico: "day-clear",
      temperatura_minima: 21,
      temperatura_maxima: 31,
    },
  ];

  const backgroundImage = Theme.getBackground();
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        color:"white"
      }}
    >
      <Header data={actuallValues}/>
      <TodayScroll datosClimaticos={datosClima} />
      <WeekScroll datosClimaticos={climaSemanal} />
      <div className="container text-center">
        <WeekChart datosClimaticos={climaSemanal} />
        <DataCards data={actuallValues} />
      </div>
    </div>
  );
};

export default LangingPage;
