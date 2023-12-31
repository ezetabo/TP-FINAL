import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { ExcelService } from 'src/app/service/excel-service.service';
import { sortByApellido } from 'src/app/utils/listas';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent {

  @Output() public opcion = new EventEmitter<UsuarioGral>();
  @Output() public autorizar = new EventEmitter<UsuarioGral>();

  @Input() lista: UsuarioGral[] = [];
  @Input() tipo: string = 'especialista';
  @Input() mensaje: string = 'Seleccione un tipo de usuario para mostrar.';
  @Input() verDescargar: boolean = false;


  constructor(private dsc:ExcelService) { }

  getRowClass(index: number) {
    return index % 2 == 0 ? 'even-row' : 'odd-row';
  }

  ordenar() {
    this.lista = sortByApellido(this.lista);
  }

  authUser(user: UsuarioGral) {
    this.autorizar.emit(user);
  }

  getOpcion(opcion: UsuarioGral) {
    this.opcion.emit(opcion);
  }

  descargar(us:UsuarioGral){
    this.dsc.guardarComoExcel(us);
  }

}
