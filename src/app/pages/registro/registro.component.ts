import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { AuthService } from 'src/app/service/auth.service';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { UsuarioGralDBService } from 'src/app/service/usuarioGralDB.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registro-gral',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  public rol: string = '';
  public usuario!: UsuarioGral;

  constructor(private msj: MensajeroService, private auth: AuthService, private uDB: UsuarioGralDBService,
    private rtr: Router) { }

  ngOnInit(): void {
    if (this.rol == '') {
      this.rol = this.msj.leerDato();
    }
  }

  getUsuario(event: UsuarioGral) {
    this.usuario = event;
    this.auth.registerUser(this.usuario.Email, this.usuario.Password).then(res => {
      if (res) {
        this.uDB.addData(this.usuario);
        Swal.fire({
          title: 'Creacion exitosa!',
          text: this.rol == 'especialista' ? 'Recuerde que un administrador debe autorizar su cuenta' : 'Datos cargados correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ok'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'No olvide verificar su email'
            )
            if(this.msj.mantener()){
              this.auth.login(this.msj.leerEmail(),this.msj.leerPass());}
              const ruta = this.msj.leerRoute() == '' ? 'welcome' : this.msj.leerRoute()
              this.rtr.navigateByUrl(ruta);
              this.msj.enviarRoute('');
              this.msj.reset();
          }
        })
      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'El email ya esta en uso',
          showConfirmButton: false,
          timer: 1500
        })
      }
    }).catch();
  }

}
