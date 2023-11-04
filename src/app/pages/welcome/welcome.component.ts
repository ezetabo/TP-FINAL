import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MensajeroService } from 'src/app/service/mensajero.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private rtr: Router, private auth: AuthService, private msj: MensajeroService) { }

  navegar(url: string): void {
    if (url != 'login') {
      const dato = url == 'paciente' ? 'paciente' : 'especialista';
      this.msj.enviarDato(dato);
      this.rtr.navigateByUrl('registro');
    } else {
      this.rtr.navigateByUrl('login');

    }
  }

  logout() {
    this.auth.logout();
  }

}
