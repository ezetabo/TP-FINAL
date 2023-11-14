import { Injectable } from '@angular/core';
import { UsuarioGralDBService } from './usuarioGralDB.service';
import { UsuarioGral } from '../interface/usuario-gral.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private ugDB: UsuarioGralDBService) { }

  getUsers(pac: number = 0, espec: number = 0, admin: number = 0): Observable<UsuarioGral[]> {
    return this.ugDB.getData().pipe(
      map(usuarios => {
        let usuariosSelected: UsuarioGral[] = [];

        usuarios.forEach(usuario => {
          if (admin != 0 && usuario.Rol === 'admin') {
            usuariosSelected.push(usuario);
            admin -= 1;
          }
          if (espec != 0 && usuario.Rol === 'especialista') {
            usuariosSelected.push(usuario);
            espec -= 1;
          }
          if (pac != 0 && usuario.Rol === 'paciente') {
            usuariosSelected.push(usuario);
            pac -= 1;
          }
        });

        return usuariosSelected;
      })
    );
  }


}
