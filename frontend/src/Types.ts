export interface DatosClimaticos {
  hora: string;
  date: "string";
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
