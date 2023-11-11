import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dia } from 'src/app/interface/horario-laboral.interface';
import { AuthService } from 'src/app/service/auth.service';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { obtenerFechaActual } from 'src/app/utils/listas';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  public ocultar: boolean = true;
  constructor(private rtr: Router, private auth: AuthService, private msj: MensajeroService) { }

  navegar(url: string): void {
    this.ocultar = false

    for (let index = 0; index < 15; index++) {
      const fecha = obtenerFechaActual(index)
      if (fecha.dia == Dia.domingo) {
        continue;
      }
      console.log(fecha);
    }

    setTimeout(() => {
      this.ocultar = true;
      if (url != 'login') {
        const dato = url == 'paciente' ? 'paciente' : 'especialista';
        this.msj.enviarDato(dato);
        this.rtr.navigateByUrl('registro');
      } else {
        this.rtr.navigateByUrl('login');
      }
    }, 1000);
  }

  logout() {
    this.auth.logout();
  }

}
