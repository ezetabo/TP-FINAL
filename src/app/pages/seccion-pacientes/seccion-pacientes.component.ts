import { Component, OnInit } from '@angular/core';
import { Turno } from 'src/app/interface/turno.interface';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { TurnosDBService } from 'src/app/service/turnosDB.service';

@Component({
  selector: 'app-seccion-pacientes',
  templateUrl: './seccion-pacientes.component.html',
  styleUrls: ['./seccion-pacientes.component.css']
})
export class SeccionPacientesComponent implements OnInit {
  public turnos: Turno[] = [];
  public turnosFiltrados: Turno[] = [];
  public usuario: UsuarioGral = {
    id: 'Fk1VvEa1Kz1fNozqlmTc',
    Nombre: 'Francisco Luis',
    Apellido: 'Carbonell',
    Edad: 22,
    Dni: '49123123',
    Email: '',
    Password: '',
    Imagen: '',
    Rol: 'especialista',
    Especialidades: [],
    Autorizado: true,
    Imagen2: '',
    ObraSocial: '',
  }

  constructor(private trnServ: TurnosDBService, private msj: MensajeroService) { }

  ngOnInit(): void {
    this.trnServ.getData(this.usuario).subscribe(x => {
      this.usuario = this.msj.getCurrentUser();
      this.turnos = x.filter(t => t.especialista.id == this.usuario.id);
    });
  }

  verTurnos(trn: Turno) {
    this.turnosFiltrados = [];
    this.turnosFiltrados = this.turnos.filter(t => t.paciente.id == trn.paciente.id);
  }

}
