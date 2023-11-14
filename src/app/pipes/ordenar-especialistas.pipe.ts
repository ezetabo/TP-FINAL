import { Pipe, PipeTransform } from '@angular/core';
import { CronogramaEspecialista } from '../interface/horario-laboral.interface';

@Pipe({
  name: 'ordenarEspecialistas'
})
export class OrdenarEspecialistasPipe implements PipeTransform {

  transform(cronogramas: CronogramaEspecialista[]): CronogramaEspecialista[] {
    return cronogramas.sort((a, b) => {
      const A = (a && a.especialista.Apellido) ? a.especialista.Apellido.toLowerCase() : '';
      const B = (b && b.especialista.Apellido) ? b.especialista.Apellido.toLowerCase() : '';

      if (A < B) {
        return -1;
      }
      if (A > B) {
        return 1;
      }
      return 0;
    });
  }

}
