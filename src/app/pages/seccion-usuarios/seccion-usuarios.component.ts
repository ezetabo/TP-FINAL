import { Component } from '@angular/core';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { UsuarioGralDBService } from 'src/app/service/usuarioGralDB.service';

@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.css']
})
export class SeccionUsuariosComponent {
  public usuarios: UsuarioGral[] = [];
  public tiposUsuarios: string[] = ['admin', 'paciente', 'especialista']
  public usuario?: UsuarioGral;
  public selectedTipo: string ='';

  constructor(private usS: UsuarioGralDBService) { }

  getUsuario(usuario: UsuarioGral) {
    this.usuario = usuario;
    if (this.usuario.Rol == 'especialista') {
      this.usuario.Autorizado = !this.usuario.Autorizado
      this.usS.modificar(this.usuario);
    }

  }


  searchByTipo(term: string): void {
    this.selectedTipo = term;
    this.usuarios = [];
    this.usS.getData().subscribe(usuarios => {
      usuarios.forEach(x => {
        if (x.Rol == term && !this.usuarios.some(u => u.id === x.id)) {
          this.usuarios.push(x);
        }
      });
    });
  }

}
