import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeroService {

  private datoSource: string = '';
  private route: string = '';
  private email: string = '';
  private pass: string = '';
  private mant: boolean = false;

  enviarRoute(dato: string) {
    this.route = dato;
  }

  leerRoute(): string {
    return this.route;
  }
  enviarDato(dato: string) {
    this.datoSource = dato;
  }

  leerDato(): string {
    return this.datoSource;
  }

  enviarLogueo(email: string, pass: string) {
    this.email = email;
    this.pass = pass;
    this.mant = true;
  }

  reset() {
    this.email = '';
    this.pass = '';
    this.mant = false;
  }

  leerEmail(): string {
    return this.email;
  }
  leerPass(): string {
    return this.pass;
  }
  mantener(): boolean {
    return this.mant;
  }

}
