export interface DatosClimaticos {
  hora: string;
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
