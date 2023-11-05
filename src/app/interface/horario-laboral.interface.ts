import { UsuarioGral } from "./usuario-gral.interface";

export interface HorarioLaboral {
  id: string,
  dia: Dia,
  especialista: UsuarioGral,
  horarios: Horario[],
}

export interface Horario {
  hora: Hora,
  disponible: boolean
}

export type Hora =
  '08:00' | '08:30' | '09:00' | '09:30' | '10:00' | '10:30' | '11:00' | '11:30' | '12:00' |
  '12:30' | '13:00' | '13:30' | '14:00' | '14:30' | '15:00' | '15:30' | '16:00' | '16:30' |
  '17:00' | '17:30' | '18:00' | '18:30' | '19:00';


export enum Dia {
  lunes = 'lunes', martes = 'martes', miercoles = 'miercoles', jueves = 'jueves', viernes = 'viernes', sabado = 'sabado'
}


export function generarDisponible(dia: Dia, especialista: UsuarioGral, horaInicio: Hora, horaFin: Hora): HorarioLaboral {
  const startDate = new Date(0, 0, 0, parseInt(horaInicio.split(':')[0]), parseInt(horaInicio.split(':')[1]));
  const endDate = new Date(0, 0, 0, parseInt(horaFin.split(':')[0]), parseInt(horaFin.split(':')[1]));
  const horarios: Horario[] = [];
  while (startDate < endDate) {
    const horaActual = startDate.getHours().toString().padStart(2, '0') + ':' + startDate.getMinutes().toString().padStart(2, '0');
    horarios.push({ hora: horaActual as Hora, disponible: true });
    startDate.setMinutes(startDate.getMinutes() + 30);
  }
  const horario: HorarioLaboral = { id: '', dia, especialista, horarios };
  return horario;
}
