import { Pipe, PipeTransform } from '@angular/core';
import { CronogramaAtencion } from '../interface/cronograma-atencion.interface';

@Pipe({
  name: 'ordenarCronograma'
})
export class OrdenarCronogramaPipe implements PipeTransform {

  transform(cronogramas: CronogramaAtencion[]): CronogramaAtencion[] {
    return cronogramas.sort((crono1, crono2) => {
      const fecha1 = this.parsearFecha(crono1.fecha.fecha);
      const fecha2 = this.parsearFecha(crono2.fecha.fecha);
      return fecha1.getTime() - fecha2.getTime();
    });
  }

  private parsearFecha(fechaString: string): Date {
    const [dia, mes, ano] = fechaString.split('/').map(Number);

    const fechaParseada = new Date(ano + 2000, mes - 1, dia);
    return fechaParseada;
  }
}
