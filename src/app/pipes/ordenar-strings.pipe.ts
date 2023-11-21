import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordenarStrings'
})
export class OrdenarStringsPipe implements PipeTransform {

  transform(palabras: string[]): string[] {
    return palabras.sort((a, b) => {
      const A = (a && a) ? a.toLowerCase() : '';
      const B = (b && b) ? b.toLowerCase() : '';

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
