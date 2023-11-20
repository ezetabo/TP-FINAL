import { Component, OnInit } from '@angular/core';
import { Lista } from 'src/app/interface/listas.interface';
import { Turno } from 'src/app/interface/turno.interface';
import { Especialista, UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { TurnosDBService } from 'src/app/service/turnosDB.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public turnos: Turno[] = [];
  public miTurno: Turno | null = null;
  public usuario: UsuarioGral = {
    id: 'MvophzEYGpT8HYGIR1Hx',
    Nombre: 'Antia',
    Apellido: 'Pino',
    Edad: 22,
    Dni: '49123123',
    Email: '',
    Password: '',
    Imagen: '',
    Rol: 'admin',
    Especialidades: [],
    Autorizado: true,
    Imagen2: '',
    ObraSocial: '',
  }

public especialistas:Especialista[] = [];
public especialidades:Lista[] = [];


  constructor(private trnServ: TurnosDBService, private msj: MensajeroService) { }
  ngOnInit(): void {
    //this.usuario = this.msj.getCurrentUser();
    this.trnServ.getData(this.usuario).subscribe(x => {
      this.turnos = x;
    });
  }

  getTurno(turno: Turno) {
    this.miTurno = turno;
  }

  filtrar(tipo:string){

  }

  filtrarPorEspecialista(esp: Especialista) {
    this.turnos.forEach(trn=>{
      this.especialistas.push(trn.especialista)
    });
  }

  filtrarPorEspecialidad(nombre: string){
    this.turnos.forEach(trn=>{
      this.especialistas.push(trn.especialista)
    });
  }
}
