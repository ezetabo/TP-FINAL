import { Injectable } from '@angular/core';
import { UsuarioGralDBService } from './usuarioGralDB.service';
import { UsuarioGral } from '../interface/usuario-gral.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usuarios: UsuarioGral[] = [];
  constructor(private ugDB: UsuarioGralDBService) {
    this.ugDB.getData().subscribe(x => {
      this.usuarios = x;
    })
  }

  getUsers(pac: number = 0, espec: number = 0, admin: number = 0): UsuarioGral[] {
    let usuariosSelected: UsuarioGral[] = [];
    this.usuarios.forEach(x => {
      if (admin != 0 && x.Rol == 'admin') {
        usuariosSelected.push(x);
        admin -= 1;
      }
      if (espec != 0 && x.Rol == 'especialista' && x.Autorizado) {
        usuariosSelected.push(x);
        espec -= 1;
      }
      if (pac != 0 && x.Rol == 'paciente') {
        usuariosSelected.push(x);
        pac -= 1;
      }
    });
    return usuariosSelected;
  }


}
