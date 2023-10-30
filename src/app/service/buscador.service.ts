import { Injectable } from '@angular/core';
import { EspecialistaDBService } from './especialistaDB.service';
import { UsuarioDBService } from './usuarioDB.service';
import { PacienteDBService } from './pacienteDB.service';
import { Observable } from 'rxjs';
import { Especialista } from '../interface/especialista.interface';
import { Usuario } from '../interface/usuario.interface';
import { Paciente } from '../interface/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class BuscadorService {

  constructor(private esp: EspecialistaDBService, private user: UsuarioDBService, private pac: PacienteDBService) { }

  especialistaByEmail(email: string): Observable<Especialista | false> {
    return new Observable<Especialista | false>((observer) => {
      this.esp.getData().subscribe((todos) => {
        observer.next(todos.find(x => x.Email == email));
        observer.complete();
      });
      observer.next(false);
      observer.complete();
    });
  }

  usuarioByEmail(email: string): Observable<Usuario | false> {
    return new Observable<Usuario | false>((observer) => {
      this.user.getData().subscribe((todos) => {
        observer.next(todos.find(x => x.Email == email));
        observer.complete();
      });
      observer.next(false);
      observer.complete();
    });
  }

  pacienteByEmail(email: string): Observable<Paciente | false> {
    return new Observable<Paciente | false>((observer) => {
      this.pac.getData().subscribe((todos) => {
        observer.next(todos.find(x => x.Email == email));
        observer.complete();
      });
      observer.next(false);
      observer.complete();
    });
  }







}

