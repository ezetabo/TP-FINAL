import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BuscadorService } from 'src/app/service/buscador.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment.development';
import { UsersService } from 'src/app/service/users.service';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = 'loginFirebase';
  public showPassword: boolean = false;
  usuario = {
    email: '',
    password: ''
  }

  public usuarios: UsuarioGral[] = [];

  constructor(private authService: AuthService, private bsc: BuscadorService, private rtr: Router, private usS:UsersService) { }

  ngOnInit(): void {
    this.usuarios = this.usS.getUsers(3,2,1);
  }

  ingresar(tipo: string = ''): void {
    let email: string = '';
    let password: string = '';
    switch (tipo) {
      case 'paciente':
        email = environment.users.pac.email;
        password =environment.users.pac.password;
        break;
      case 'especialista':
        email = environment.users.esp.email;
        password =environment.users.esp.password;
        break;
      case 'admin':
        email = environment.users.admin.email;
        password =environment.users.admin.password;
        break;

      default:
        email = this.usuario.email;
        password = this.usuario.password;
        break;
    }

    this.login(email, password);
  }


  login(email: string, password: string) {
    this.authService.login(email, password)
      .then(res => {
        if (res) {
          if (res.user.emailVerified) {
            this.bsc.userByEmail(email).subscribe(x => {
              if (!x || x.Autorizado) {
                console.log('login Ok');
                this.rtr.navigateByUrl('home');
              } else {
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
