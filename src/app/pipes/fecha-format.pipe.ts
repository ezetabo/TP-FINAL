import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaFormat'
})
export class FechaFormatPipe implements PipeTransform {

  transform(fecha: string): string {
    if (!fecha) {
      return '';
    }
    const partes = fecha.split('/');
    if (partes.length !== 3) {
      return fecha;
    }
    const [dia, mes, anio] = partes.map((parte) => parseInt(parte, 10));
    const fechaFormateada = `20${anio}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;
    return fechaFormateada;
  }

}
