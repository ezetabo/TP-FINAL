import { Dia, Hora } from "./horario-laboral.interface";
import { Especialista, Paciente } from "./usuario-gral.interface";


export interface Turno {
  id: string
  especialidad: string,
  especialista: Especialista,
  paciente: Paciente,
  estado: Estado,
  comentario: string,
  resenia: string,
  diagnostico: string,
  encuesta: Encuesta,
  calificacion: number,
  fecha: string
  dia: Dia,
  hora: Hora,
}

export enum Estado {
  cancelado = 'cancelado',
  aceptado = 'aceptado',
  rechazado = 'rechazado',
  pendiente = 'pendiente',
  finalizado = 'finalizado',
  vencido = 'vencido'
}

export interface Encuesta{
  experienciaGeneral: string,
  accesoTiemposEspera: string,
  sugerencias: string
}


