export interface Turno {
  especialidad: string,
  especialista: string,
  paciente: string,
  estado: string,
  comentario: string,
  reseña: string,
  encuesta: string,
  calificacion: number,
  fehca:string
  dia: Dia,
  hora: Hora,
}

export interface TurnoHorario {
  dia: Dia,
  horarios: Horario[],
}

export interface Horario {
  hora: Hora,
  disponible: boolean
}

export type Hora =
  '08:00' | '08:30' | '09:00' | '09:30' | '10:00' | '10:30' | '11:00' | '11:30' | '12:00' |
  '12:30' | '13:00' | '13:30' | '14:00' | '14:30' | '15:00' | '15:30' | '16:00' | '16:30' |
  '17:00' | '17:30' | '18:00' | '18:30';


export enum Dia {
  lunes = 'lunes', martes = 'martes', miercoles = 'miercoles', jueves = 'jueves', viernes = 'viernes', sabado = 'sabado'
}


export function generarDisponible(dia: Dia): TurnoHorario {

  const semanal: Horario[] = [{ hora: '08:00', disponible: true }, { hora: '08:30', disponible: true },
  { hora: '09:00', disponible: true }, { hora: '09:30', disponible: true }, { hora: '10:00', disponible: true },
  { hora: '10:30', disponible: true }, { hora: '11:00', disponible: true }, { hora: '11:30', disponible: true },
  { hora: '12:00', disponible: true }, { hora: '12:30', disponible: true }, { hora: '13:00', disponible: true },
  { hora: '13:30', disponible: true }, { hora: '14:00', disponible: true }, { hora: '14:30', disponible: true },
  { hora: '15:00', disponible: true }, { hora: '15:30', disponible: true }, { hora: '16:00', disponible: true },
  { hora: '16:30', disponible: true }, { hora: '17:00', disponible: true }, { hora: '17:30', disponible: true },
  { hora: '18:00', disponible: true }, { hora: '18:30', disponible: true }];

  const finde: Horario[] = [{ hora: '08:00', disponible: true }, { hora: '08:30', disponible: true },
  { hora: '09:00', disponible: true }, { hora: '09:30', disponible: true }, { hora: '10:00', disponible: true },
  { hora: '10:30', disponible: true }, { hora: '11:00', disponible: true }, { hora: '11:30', disponible: true },
  { hora: '12:00', disponible: true }, { hora: '12:30', disponible: true }, { hora: '13:00', disponible: true },
   { hora: '13:30', disponible: true }];
  const horario: TurnoHorario = { dia: dia, horarios: dia == Dia.sabado ? finde : semanal };
  return horario;
}
