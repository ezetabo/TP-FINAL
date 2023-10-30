import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ordenarString } from 'src/app/utils/listas';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  @Output() public opcion = new EventEmitter<string>();
  @Input() lista: string[] = [];
  @Input() titulo: string = '';


  constructor() { }

  getRowClass(index: number) {
    return index % 2 == 0 ? 'even-row' : 'odd-row';
  }

  ordenar() {
    this.lista = ordenarString(this.lista);
  }

  getOpcion(opcion: string) {
    this.opcion.emit(opcion);
  }
}
