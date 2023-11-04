import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BuscadorService } from 'src/app/service/buscador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'loginFirebase';
  public showPassword: boolean = false;
  usuario = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private bsc: BuscadorService, private rtr: Router) { }

  ingresar(): void {

    const { email, password } = this.usuario
    this.autoLog(email, password);
  }


  autoLog(email: string, password: string) {
    this.authService.login(email, password)
      .then(res => {
        if (res) {
          if (res.user.emailVerified) {
            this.bsc.userByEmail(email).subscribe(x =>{
              if(!x  || x.Autorizado){
                console.log('login Ok');
                this.rtr.navigateByUrl('home');
              }else{
                Swal.fire('Falta la aprobacion de un administrador');
              }
            });
          } else {
            Swal.fire('su email no esta verificado');
          }
        } else {
          Swal.fire('email o contraseña incorrectos');
        }
      });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }



}
