export interface DatosClimaticos {
  hora: string;
  date: string;
  temperatura: number;
  estado_tiempo: string;
  porcentaje_lluvia: number;
  confort: confort[];
}

export interface confort {
  name: string;
  value: number;
}

export interface DatosClimaticosSemanales {
  dia: string;
  fecha: string;
  pronostico: string;
  temperatura_minima: number;
  temperatura_maxima: number;
}

export interface dayPronostics {
  momento: string;
  date?: string;
  temperatura: number;
  tiempo: string;
  probabilidad_de_lluvia: number;
}

export interface confortValues {
  tempeture: number;
  hora: string;
  date: string;
  airQuality: number;
  sunrise: string;
  sunset: string;
  confort: confort[];
}

export interface hoursValues {
  hora: string;
  date: string;
  condiciones: string;
  temperatura: number;
  probabilidad_de_lluvia: number;
  velocidad_viento: number;
  direccion_viento: number;
  humedad: number;
  luz: string;
  presion: number;
  lluvia: number;
}

export interface landingProps {
  actual: DatosClimaticos;
  next48: DatosClimaticos[];
  week: DatosClimaticosSemanales[];
}

export interface nowProps {
  todayPronostic: dayPronostics[];
  confortValues: confortValues;
  hourPronostic: dayPronostics[];
  dialyPronostics: dayPronostics[];
}

export interface climaticStatesValues {
  name:
    | "cloudy-heavyRain"
    | "cloudy"
    | "cloudy-snowy"
    | "cloudy-strongWind"
    | "cloudy-thunderstorm"
    | "day-clear"
    | "day-cloudy"
    | "day-rainy"
    | "day-snowy"
    | "night-clear"
    | "night-cloudy"
    | "night-rainy"
    | "night-snowy";
}

export interface TesjoValues{
  timestamp: number;
  fecha: string;
  hora: string;
  minuto: number;
  direccion: number;
  humedad: number;
  lluvia: number;
  luz: number;
  presion: number;
  temperatura: number;
  velocidad: number;
}

export interface SQLTesjoResponse{
dataValues: TesjoValues;
}