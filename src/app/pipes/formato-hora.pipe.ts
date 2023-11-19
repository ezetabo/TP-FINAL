import { Pipe, type PipeTransform } from '@angular/core';
import { parsearFecha } from '../utils/listas';

@Pipe({
  name: 'FormatoHora',
  standalone: true,
})
export class FormatoHoraPipe implements PipeTransform {

  transform(fechaString: string): string {
    const fechaOriginal = parsearFecha(fechaString);
    const anioFormateado = fechaOriginal.getFullYear();
    const mesFormateado = (fechaOriginal.getMonth() + 1).toString().padStart(2, '0');
    const diaFormateado = fechaOriginal.getDate().toString().padStart(2, '0');
    const horas = fechaOriginal.getHours() % 12 || 12;
    const minutos = fechaOriginal.getMinutes().toString().padStart(2, '0');
    const ampm = fechaOriginal.getHours() < 12 ? 'AM' : 'PM';
    return `${anioFormateado}-${mesFormateado}-${diaFormateado} ${horas}:${minutos} ${ampm}`;
  }

}
