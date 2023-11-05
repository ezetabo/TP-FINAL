import { Dia, Hora } from "./horario-laboral.interface";


export interface Turno {
  especialidad: string,
  especialista: string,
  paciente: string,
  estado: string,
  comentario: string,
  reseña: string,
  encuesta: string,
  calificacion: number,
  fecha: string
  dia: Dia,
  hora: Hora,
}




