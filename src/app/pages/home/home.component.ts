import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { BuscadorService } from 'src/app/service/buscador.service';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public ver: boolean = false;

  public usuario!: UsuarioGral;

  constructor(private auth: AuthService, private bsc: BuscadorService, private msj: MensajeroService,
    private rtr: Router) { }


  ngOnInit(): void {
    this.auth.getUserEmail().subscribe(x => {
      this.bsc.userByEmail(x!).subscribe(user => {
        this.usuario = user as UsuarioGral
        this.msj.cargarCurrentUser(this.usuario);


      });
    })
  }

  logout() {
    this.auth.logout();
  }

  verUser() {
    this.ver = !this.ver;
  }


home(){
  this.rtr.navigateByUrl('home')
}


  navegar(url: string): void {

    this.msj.reset();
    this.msj.enviarDato(url);
    this.msj.enviarLogueo(this.usuario.Email,this.usuario.Password);
    this.msj.enviarRoute('home');
    this.rtr.navigateByUrl('home/alta-usuarios');

  }





}
