import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../interface/turno.interface';

@Pipe({
  name: 'filtrarUnicoTurno'
})
export class FiltrarUnicoTurnoPipe implements PipeTransform {

  transform(turnos: Turno[], campo: string): Turno[] {
    if (!turnos || turnos.length <= 1) {
      return turnos;
    }

    const turnosUnicos = new Map<string, Turno>();

    turnos.forEach(turno => {
      let clave: string;
      switch (campo) {
        case 'especialidad':
          clave = turno.especialidad;
          break;
        case 'especialista':
          clave = turno.especialista.id;
          break;
        case 'paciente':
          clave = turno.paciente.id;
          break;
        default:
          clave = '';
      }

      if (clave && !turnosUnicos.has(clave)) {
        turnosUnicos.set(clave, turno);
      }
    });

    return Array.from(turnosUnicos.values());
  }

}
