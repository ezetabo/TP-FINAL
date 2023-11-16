import { Pipe, PipeTransform } from '@angular/core';
import { UsuarioGral } from '../interface/usuario-gral.interface';

@Pipe({
  name: 'ordenarUsuariosGral'
})
export class OrdenarUsuariosGralPipe implements PipeTransform {

  transform(cronogramas: UsuarioGral[]): UsuarioGral[] {
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
