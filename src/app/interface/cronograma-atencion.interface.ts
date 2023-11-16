import { Fecha, Horario } from "./horario-laboral.interface";
import { Especialista } from "./usuario-gral.interface";

export interface CronogrmaQuincena {
  id: string,
  quincena: CronogramaAtencion[]
}

export interface CronogramaAtencion {
  id: string,
  fecha: Fecha,
  turnos: EspecialistaTurnos[]
}

export interface EspecialistaTurnos {
  especialista: Especialista,
  turnos: Horario[]
}
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}



