import { Pipe, PipeTransform } from '@angular/core';
import { Turno } from '../interface/turno.interface';
import { parsearFecha } from '../utils/listas';

@Pipe({
  name: 'ordenarTurnos'
})
export class OrdenarTurnosPipe implements PipeTransform {

  transform(turnos: Turno[], campo: string): Turno[] {
    if (!turnos || turnos.length <= 1) {
      return turnos;
    }
    const turnosCopia = [...turnos];
    switch (campo) {
      case 'especialidad':
        return turnosCopia.sort((a, b) => a.especialidad.toLowerCase().localeCompare(b.especialidad.toLowerCase()));
      case 'especialista':
        return turnosCopia.sort((a, b) => a.especialista.Apellido.toLowerCase().localeCompare(b.especialista.Apellido.toLowerCase()));
      case 'paciente':
        return turnosCopia.sort((a, b) => a.paciente.Apellido.toLowerCase().localeCompare(b.paciente.Apellido.toLowerCase()));
      case 'fecha':
        return turnosCopia.sort((a, b) => {
          const fechaA = parsearFecha(a.fecha);
          const fechaB = parsearFecha(b.fecha);
          return fechaA.getTime() - fechaB.getTime();
        });
      default:
        return turnos;
    }
  }

}
