import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeroService {

  private datoSource: string = '';

  enviarDato(dato: string) {
    this.datoSource = dato;
  }

  leerDato(): string {
    return this.datoSource;
  }


}
