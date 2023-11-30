import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estado, Turno } from 'src/app/interface/turno.interface';

@Component({
  selector: 'app-tabla-turnos',
  templateUrl: './tabla-turnos.component.html',
  styleUrls: ['./tabla-turnos.component.css']
})
export class TablaTurnosComponent {
  @Output() public opcion = new EventEmitter<Turno>();
  @Input() lista: Turno[] = [];
  @Input() mensaje: string = '';
  @Input() verMsj: boolean = true;

  getRowClass(index: number) {
    return index % 2 == 0 ? 'even-row' : 'odd-row';
  }

  getOpcion(opcion: Turno) {
    this.opcion.emit(opcion);
  }

  getEstadoClase(estado: Estado): string {
    switch (estado) {
      case Estado.cancelado:
      case Estado.rechazado:
        return 'bg-danger text-light';
      case Estado.aceptado:
        return 'bg-success text-light';
      case Estado.pendiente:
        return 'bg-info';
      case Estado.finalizado:
        return 'bg-secondary';
      case Estado.vencido:
        return 'bg-warning';
    }
  }



}
