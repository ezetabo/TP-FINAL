import { Injectable } from '@angular/core';
import { UsuarioGral } from '../interface/usuario-gral.interface';

@Injectable({
  providedIn: 'root'
})
export class MensajeroService {

  private datoSource: string = '';
  private route: string = '';
  private email: string = '';
  private pass: string = '';
  private mant: boolean = false;
  private currentUser: UsuarioGral= {
    id: '',
    Nombre: '',
    Apellido: '',
    Edad: 0,
    Dni: '',
    Email: '',
    Password: '',
    Imagen: '',
    Rol: '',
    Especialidades: [],
    Autorizado: true,
    Imagen2: '',
    ObraSocial: '',
  };

  public enviarRoute(dato: string) {
    this.route = dato;
  }

  public leerRoute(): string {
    return this.route;
  }
  public enviarDato(dato: string) {
    this.datoSource = dato;
  }

  public leerDato(): string {
    return this.datoSource;
  }

  public enviarLogueo(email: string, pass: string) {
    this.email = email;
    this.pass = pass;
    this.mant = true;
  }

  public reset() {
    this.email = '';
    this.pass = '';
    this.mant = false;
    this.route = '';
    this.datoSource = '';
  }

  public leerEmail(): string {
    return this.email;
  }
  public leerPass(): string {
    return this.pass;
  }
  public mantener(): boolean {
    return this.mant;
  }

  public cargarCurrentUser(user: UsuarioGral) {
    this.currentUser = user;
  }

  public getCurrentUser(): UsuarioGral {
    return this.currentUser;
  }
}
