import { Component, OnInit } from '@angular/core';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public usuario: UsuarioGral | null = null;
  public ocultar: boolean = false;

  constructor(private msj: MensajeroService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.usuario = this.msj.getCurrentUser();
      this.ocultar = true;
    }, 500);
  }

}
