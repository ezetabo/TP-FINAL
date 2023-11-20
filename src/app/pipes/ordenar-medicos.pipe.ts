import { Pipe, PipeTransform } from '@angular/core';
import { Especialista } from '../interface/usuario-gral.interface';

@Pipe({
  name: 'ordenarMedicos'
})
export class OrdenarMedicosPipe implements PipeTransform {
  transform(cronogramas: Especialista[]): Especialista[] {
    return cronogramas.sort((a, b) => {
      const A = (a && a.Apellido) ? a.Apellido.toLowerCase() : '';
      const B = (b && b.Apellido) ? b.Apellido.toLowerCase() : '';

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
