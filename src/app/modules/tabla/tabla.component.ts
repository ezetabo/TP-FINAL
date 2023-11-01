import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { sortByApellido } from 'src/app/utils/listas';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {
  @Output() public opcion = new EventEmitter<UsuarioGral>();
  @Input() lista: UsuarioGral[] = [];
  @Input() tipo:string='';


  constructor() { }

  getRowClass(index: number) {
    return index % 2 == 0 ? 'even-row' : 'odd-row';
  }

  ordenar() {
    this.lista = sortByApellido(this.lista);
  }

  getOpcion(opcion: UsuarioGral) {
    this.opcion.emit(opcion);
  }
}
