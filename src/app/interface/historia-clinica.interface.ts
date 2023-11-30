import { Paciente } from "./usuario-gral.interface";

export interface HistoriaClinica {
  fecha: string;
  paciente: Paciente
  altura: number;
  peso: number;
  temperatura: number;
  presion: string;
  datos: Datos[];
}

export interface Datos {
  [clave: string]: string;
}
