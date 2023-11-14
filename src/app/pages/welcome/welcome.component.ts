import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dia } from 'src/app/interface/horario-laboral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { obtenerFechaActual } from 'src/app/utils/listas';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private rtr: Router, private msj: MensajeroService) { }

  navegar(url: string): void {
    if (url != 'login') {
      const dato = url == 'paciente' ? 'paciente' : 'especialista';
      this.msj.enviarDato(dato);
      this.rtr.navigateByUrl('registro');
    } else {
      this.rtr.navigateByUrl('login');
    }
  }

}
