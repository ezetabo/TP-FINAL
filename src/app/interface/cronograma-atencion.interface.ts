import { Fecha, Horario } from "./horario-laboral.interface";
import { Especialista } from "./usuario-gral.interface";



export interface CronogramaAtencion {
  fecha: Fecha,
  turnos: EspecialistaTurnos[]
}

export interface EspecialistaTurnos {
  fecha: Fecha,
  especialista: Especialista,
  turnos: Horario[]
}
export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}



