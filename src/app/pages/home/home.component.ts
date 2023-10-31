import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario.interface';
import { AuthService } from 'src/app/service/auth.service';
import { Paciente } from '../../interface/paciente.interface';
import { Especialista } from 'src/app/interface/especialista.interface';
import { BuscadorService } from 'src/app/service/buscador.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public usuario: Usuario | false = false;
  public paciente: Paciente | false = false;
  public especialista: Especialista | false = false;
  public nombre: string = '';
  public rol: string = '';
  public ver: boolean = false;

  constructor(private auth: AuthService, private bsc: BuscadorService) { }


  ngOnInit(): void {
    this.auth.getUserEmail().subscribe(email => {
      forkJoin([
        this.bsc.especialistaByEmail(email!),
        this.bsc.pacienteByEmail(email!),
        this.bsc.usuarioByEmail(email!)
      ]).subscribe(([especialista, paciente, usuario]) => {
        if (especialista !== false) {
          this.especialista = especialista;
          this.nombre = this.especialista.Apellido + ', ' + this.especialista.Nombre + ' - ';
          this.rol = 'Especialista';
        } else if (paciente !== false) {
          this.paciente = paciente;
          this.nombre = this.paciente.Apellido + ', ' + this.paciente.Nombre + ' - ';
          this.rol = 'Paciente';
        } else if (usuario !== false) {
          this.usuario = usuario;
          this.nombre = this.usuario.Apellido + ', ' + this.usuario.Nombre + ' - ';
          this.rol = 'Administrador';
        }
      });
    });
  }

  logout() {
    this.auth.logout();
  }

  verUser(){
    this.ver =!this.ver;
  }








}
