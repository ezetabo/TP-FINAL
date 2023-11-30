import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Turno } from 'src/app/interface/turno.interface';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { ExcelService } from 'src/app/service/excel-service.service';
import { PdfService } from 'src/app/service/pdf-service.service';
import { TurnosDBService } from 'src/app/service/turnosDB.service';
import { sortByApellido } from 'src/app/utils/listas';

@Component({
  selector: 'app-cards-usuarios',
  templateUrl: './cards-usuarios.component.html',
  styleUrls: ['./cards-usuarios.component.css']
})
export class CardsUsuariosComponent implements OnInit {

  @Output() public opcion = new EventEmitter<UsuarioGral>();
  @Output() public autorizar = new EventEmitter<UsuarioGral>();

  @Input() lista: UsuarioGral[] = [];
  @Input() tipo: string = 'especialista';
  @Input() mensaje: string = 'Seleccione un tipo de usuario para mostrar.';
  @Input() activarDescarga: boolean = false;
  public turnos: Turno[] = [];
  public turnosFiltrados: Turno[] = [];

  constructor(private trnServ: TurnosDBService, private dsc: ExcelService) { }

  ngOnInit(): void {
    this.trnServ.getAllData().subscribe(x => {
      this.turnos = x;
    });
  }

  getRowClass(index: number) {
    return index % 2 == 0 ? 'even-row' : 'odd-row';
  }

  ordenar() {
    this.lista = sortByApellido(this.lista);
  }

  authUser(user: UsuarioGral) {
    this.autorizar.emit(user);
  }

  getOpcion(usario: UsuarioGral) {
    this.opcion.emit(usario);
    if (this.activarDescarga && usario.Rol != 'admin') {
      this.turnosFiltrados = [];
      if (usario.Rol == 'paciente') {
        this.turnosFiltrados = this.turnos.filter(t => t.paciente.id == usario.id);
      } else {
        this.turnosFiltrados = this.turnos.filter(t => t.especialista.id == usario.id);
      }
      this.dsc.guardarTurnosComoExcel(this.turnosFiltrados);
    }

  }



}
