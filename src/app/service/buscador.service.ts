import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioGral } from '../interface/usuario-gral.interface';
import { UsuarioGralDBService } from './usuarioGralDB.service';


@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private usg: UsuarioGralDBService) { }

  userByEmail(email: string): Observable<UsuarioGral | false> {
    return new Observable<UsuarioGral | false>((observer) => {
      this.usg.getData().subscribe((todos) => {
        const encontrado = todos.find(x => x.Email === email);
        if (encontrado) {
          observer.next(encontrado);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

}

