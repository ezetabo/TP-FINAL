import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../interface/listas.interface';

@Pipe({
  name: 'ordenarListaString'
})
export class OrdenarListaStringPipe implements PipeTransform {

  transform(palabras: Lista[]): Lista[] {
    return palabras.sort((a, b) => {
      const A = (a && a.nombre) ? a.nombre.toLowerCase() : '';
      const B = (b && b.nombre) ? b.nombre.toLowerCase() : '';

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
