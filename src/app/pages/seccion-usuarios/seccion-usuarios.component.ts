import { Component, OnInit } from '@angular/core';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { ExcelService } from 'src/app/service/excel-service.service';
import { UsuarioGralDBService } from 'src/app/service/usuarioGralDB.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent implements OnInit {
  public usuarios: UsuarioGral[] = [];
  public filtrados: UsuarioGral[] = [];
  public tiposUsuarios: string[] = ['admin', 'paciente', 'especialista']
  public usuario?: UsuarioGral;
  public selectedTipo: string = '';

  constructor(private usS: UsuarioGralDBService, private exc: ExcelService) { }
  ngOnInit(): void {
    this.usS.getData().subscribe(usuarios => {
      this.usuarios = usuarios;
    });
  }

  getUsuario(usuario: UsuarioGral) {
    this.usuario = usuario;
    if (this.usuario.Rol == 'especialista') {
      this.usuario.Autorizado = !this.usuario.Autorizado
      this.usS.modificar(this.usuario);
    }

  }

  searchByTipo(term: string): void {
    this.selectedTipo = term;
    this.filtrados = [];
    this.usuarios.forEach(x => {
      if ((x.Rol == term) && !this.filtrados.some(u => u.id === x.id)) {
        this.filtrados.push(x);
      }
    });
  }

  descargarTodos() {
    this.exc.guardarTodos(this.usuarios);
  }

}
