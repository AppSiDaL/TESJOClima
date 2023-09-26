import Header from "./components/Header";
import TodayScroll from "./components/TodayScroll";
import { DatosClimaticos, DatosClimaticosSemanales } from "../../Types";
import WeekScroll from "./components/WeekScroll";
import WeekChart from "../../charts/WeekChart";
import DataCards from "./components/DataCards";
import Theme from "../../utils/Theme";
const LangingPage = () => {
  const datosClimaticos: DatosClimaticos[] = [
    {
      hora: "00:00",
      temperatura: 20,
      estado_tiempo: "cloudy-heavyRain",
      porcentaje_lluvia: 80,
      confort: [
        { name: "humedad", value: 50 },
        { name: "lluvia", value: 10 },
        { name: "luz", value: 55 },
        { name: "presion", value: 748 },
        { name: "viento", value: 5 },
        { name: "direccion", value: 124 },
      ],
    },
    {
      hora: "01:00",
      temperatura: 19,
      estado_tiempo: "cloudy",
      porcentaje_lluvia: 60,
      confort: [
        { name: "humedad", value: 55 },
        { name: "lluvia", value: 15 },
        { name: "luz", value: 50 },
        { name: "presion", value: 747 },
        { name: "viento", value: 6 },
        { name: "direccion", value: 128 },
      ],
    },
    {
      hora: "02:00",
      temperatura: 18,
      estado_tiempo: "cloudy-snowy",
      porcentaje_lluvia: 70,
      confort: [
        { name: "humedad", value: 60 },
        { name: "lluvia", value: 20 },
        { name: "luz", value: 45 },
        { name: "presion", value: 746 },
        { name: "viento", value: 7 },
        { name: "direccion", value: 132 },
      ],
    },
    {
      hora: "03:00",
      temperatura: 17,
      estado_tiempo: "cloudy-strongWind",
      porcentaje_lluvia: 40,
      confort: [
        { name: "humedad", value: 65 },
        { name: "lluvia", value: 25 },
        { name: "luz", value: 40 },
        { name: "presion", value: 745 },
        { name: "viento", value: 8 },
        { name: "direccion", value: 136 },
      ],
    },
    {
      hora: "04:00",
      temperatura: 16,
      estado_tiempo: "cloudy-thunderstorm",
      porcentaje_lluvia: 90,
      confort: [
        { name: "humedad", value: 70 },
        { name: "lluvia", value: 30 },
        { name: "luz", value: 35 },
        { name: "presion", value: 744 },
        { name: "viento", value: 9 },
        { name: "direccion", value: 140 },
      ],
    },
    {
      hora: "05:00",
      temperatura: 16,
      estado_tiempo: "day-clear",
      porcentaje_lluvia: 0,
      confort: [
        { name: "humedad", value: 75 },
        { name: "lluvia", value: 35 },
        { name: "luz", value: 30 },
        { name: "presion", value: 743 },
        { name: "viento", value: 10 },
        { name: "direccion", value: 144 },
      ],
    },
    {
      hora: "06:00",
      temperatura: 17,
      estado_tiempo: "day-cloudy",
      porcentaje_lluvia: 20,
      confort: [
        { name: "humedad", value: 80 },
        { name: "lluvia", value: 40 },
        { name: "luz", value: 25 },
        { name: "presion", value: 742 },
        { name: "viento", value: 11 },
        { name: "direccion", value: 148 },
      ],
    },
    {
      hora: "07:00",
      temperatura: 18,
      estado_tiempo: "day-rainy",
      porcentaje_lluvia: 50,
      confort: [
        { name: "humedad", value: 85 },
        { name: "lluvia", value: 45 },
        { name: "luz", value: 20 },
        { name: "presion", value: 741 },
        { name: "viento", value: 12 },
        { name: "direccion", value: 152 },
      ],
    },
    {
      hora: "08:00",
      temperatura: 19,
      estado_tiempo: "day-snowy",
      porcentaje_lluvia: 30,
      confort: [
        { name: "humedad", value: 90 },
        { name: "lluvia", value: 50 },
        { name: "luz", value: 15 },
        { name: "presion", value: 740 },
        { name: "viento", value: 13 },
        { name: "direccion", value: 156 },
      ],
    },
    {
      hora: "09:00",
      temperatura: 20,
      estado_tiempo: "night-clear",
      porcentaje_lluvia: 0,
      confort: [
        { name: "humedad", value: 95 },
        { name: "lluvia", value: 55 },
        { name: "luz", value: 10 },
        { name: "presion", value: 739 },
        { name: "viento", value: 14 },
        { name: "direccion", value: 160 },
      ],
    },
    {
      hora: "10:00",
      temperatura: 22,
      estado_tiempo: "night-cloudy",
      porcentaje_lluvia: 10,
      confort: [
        { name: "humedad", value: 100 },
        { name: "lluvia", value: 60 },
        { name: "luz", value: 5 },
        { name: "presion", value: 738 },
        { name: "viento", value: 15 },
        { name: "direccion", value: 164 },
      ],
    },
    {
      hora: "11:00",
      temperatura: 24,
      estado_tiempo: "night-rainy",
      porcentaje_lluvia: 40,
      confort: [
        { name: "humedad", value: 45 },
        { name: "lluvia", value: 5 },
        { name: "luz", value: 60 },
        { name: "presion", value: 737 },
        { name: "viento", value: 16 },
        { name: "direccion", value: 168 },
      ],
    },
    {
      hora: "12:00",
      temperatura: 26,
      estado_tiempo: "night-snowy",
      porcentaje_lluvia: 60,
      confort: [
        { name: "humedad", value: 50 },
        { name: "lluvia", value: 10 },
        { name: "luz", value: 55 },
        { name: "presion", value: 736 },
        { name: "viento", value: 17 },
        { name: "direccion", value: 172 },
      ],
    },
    {
      hora: "13:00",
      temperatura: 28,
      estado_tiempo: "day-clear",
      porcentaje_lluvia: 0,
      confort: [
        { name: "humedad", value: 55 },
        { name: "lluvia", value: 5 },
        { name: "luz", value: 70 },
        { name: "presion", value: 735 },
        { name: "viento", value: 18 },
        { name: "direccion", value: 176 },
      ],
    },
    {
      hora: "14:00",
      temperatura: 30,
      estado_tiempo: "day-cloudy",
      porcentaje_lluvia: 10,
      confort: [
        { name: "humedad", value: 60 },
        { name: "lluvia", value: 10 },
        { name: "luz", value: 65 },
        { name: "presion", value: 734 },
        { name: "viento", value: 19 },
        { name: "direccion", value: 180 },
      ],
    },
    {
      hora: "15:00",
      temperatura: 32,
      estado_tiempo: "day-rainy",
      porcentaje_lluvia: 40,
      confort: [
        { name: "humedad", value: 65 },
        { name: "lluvia", value: 15 },
        { name: "luz", value: 60 },
        { name: "presion", value: 733 },
        { name: "viento", value: 20 },
        { name: "direccion", value: 184 },
      ],
    },
    {
      hora: "16:00",
      temperatura: 34,
      estado_tiempo: "day-snowy",
      porcentaje_lluvia: 30,
      confort: [
        { name: "humedad", value: 70 },
        { name: "lluvia", value: 20 },
        { name: "luz", value: 55 },
        { name: "presion", value: 732 },
        { name: "viento", value: 21 },
        { name: "direccion", value: 188 },
      ],
    },
    {
      hora: "17:00",
      temperatura: 27,
      estado_tiempo: "night-clear",
      porcentaje_lluvia: 0,
      confort: [
        { name: "humedad", value: 75 },
        { name: "lluvia", value: 25 },
        { name: "luz", value: 50 },
        { name: "presion", value: 731 },
        { name: "viento", value: 22 },
        { name: "direccion", value: 192 },
      ],
    },
    {
      hora: "18:00",
      temperatura: 26,
      estado_tiempo: "night-cloudy",
      porcentaje_lluvia: 10,
      confort: [
        { name: "humedad", value: 80 },
        { name: "lluvia", value: 30 },
        { name: "luz", value: 45 },
        { name: "presion", value: 730 },
        { name: "viento", value: 23 },
        { name: "direccion", value: 196 },
      ],
    },
    {
      hora: "19:00",
      temperatura: 25,
      estado_tiempo: "night-rainy",
      porcentaje_lluvia: 40,
      confort: [
        { name: "humedad", value: 85 },
        { name: "lluvia", value: 35 },
        { name: "luz", value: 40 },
        { name: "presion", value: 729 },
        { name: "viento", value: 24 },
        { name: "direccion", value: 200 },
      ],
    },
    {
      hora: "20:00",
      temperatura: 24,
      estado_tiempo: "night-snowy",
      porcentaje_lluvia: 60,
      confort: [
        { name: "humedad", value: 90 },
        { name: "lluvia", value: 40 },
        { name: "luz", value: 35 },
        { name: "presion", value: 728 },
        { name: "viento", value: 25 },
        { name: "direccion", value: 204 },
      ],
    },
    {
      hora: "21:00",
      temperatura: 23,
      estado_tiempo: "night-clear",
      porcentaje_lluvia: 0,
      confort: [
        { name: "humedad", value: 95 },
        { name: "lluvia", value: 45 },
        { name: "luz", value: 30 },
        { name: "presion", value: 727 },
        { name: "viento", value: 26 },
        { name: "direccion", value: 208 },
      ],
    },
    {
      hora: "22:00",
      temperatura: 22,
      estado_tiempo: "night-cloudy",
      porcentaje_lluvia: 10,
      confort: [
        { name: "humedad", value: 100 },
        { name: "lluvia", value: 50 },
        { name: "luz", value: 25 },
        { name: "presion", value: 726 },
        { name: "viento", value: 27 },
        { name: "direccion", value: 212 },
      ],
    },
    {
      hora: "23:00",
      temperatura: 21,
      estado_tiempo: "night-rainy",
      porcentaje_lluvia: 40,
      confort: [
        { name: "humedad", value: 45 },
        { name: "lluvia", value: 5 },
        { name: "luz", value: 60 },
        { name: "presion", value: 725 },
        { name: "viento", value: 28 },
        { name: "direccion", value: 216 },
      ],
    },
  ];

  const actuallValues: DatosClimaticos = {
    hora: "12:00",
    temperatura: 26,
    estado_tiempo: "night-snowy",
    porcentaje_lluvia: 60,
    confort: [
      { name: "humedad", value: 100 },
      { name: "lluvia", value: 60 },
      { name: "luz", value: 5 },
      { name: "presion", value: 736 },
      { name: "viento", value: 17 },
      { name: "direccion", value: 172 },
    ],
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
        color: "white",
      }}
    >
      <Header data={actuallValues} />
      <TodayScroll datosClimaticos={datosClimaticos} />
      <WeekScroll datosClimaticos={climaSemanal} />
      <div className="container text-center">
        <WeekChart datosClimaticos={climaSemanal} />
        <DataCards data={actuallValues} />
      </div>
    </div>
  );
};

export default LangingPage;
