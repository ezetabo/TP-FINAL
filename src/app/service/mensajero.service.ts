import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeroService {

  private datoSource: string = '';
  private route: string = '';

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


}
