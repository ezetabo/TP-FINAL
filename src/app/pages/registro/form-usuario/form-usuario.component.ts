import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario.interface';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';
import { UsuarioDBService } from 'src/app/service/usuarioDB.service';
import { ValidatorsService } from 'src/app/validators/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent {


  public usuario: Usuario = {
    id:'',
    Nombre: '',
    Apellido: '',
    Edad: 0,
    Dni: '',
    Email: '',
    Password: '',
    Imagen: '',
    EsAdmin: false,
    Autorizado: false

  };

  public showPassword: boolean = false;
  public lista: string[] = [];

  public otra: FormControl = new FormControl('', Validators.required)
  public myForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.pattern(this.vs.namePattern)]],
    Apellido: ['', [Validators.required, Validators.pattern(this.vs.namePattern)]],
    Edad: ['', [Validators.required, Validators.pattern(this.vs.numberPattern), Validators.min(1), Validators.max(120)]],
    Dni: ['', [Validators.required, Validators.pattern(this.vs.numberPattern), Validators.maxLength(9), Validators.minLength(6)]],
    Email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    Password: ['', [Validators.required]],
    Imagen: ['', [Validators.required]],
    Autorizado: [true, [Validators.required]],
    EsAdmin: [true, [Validators.required]]
  });


  constructor(private fb: FormBuilder, private vs: ValidatorsService, private usuarioDB: UsuarioDBService,
    private storageService: StorageService, private authService: AuthService, private rtr: Router) { }

  onSubmit() {
    if (this.myForm.valid) {
      this.usuario = this.myForm.value;
      const { Email, Password } = this.usuario;
      this.authService.registerUser(Email, Password)
        .then(res => {
          if (res) {
            this.usuarioDB.addData(this.usuario!);
            this.myForm.reset();
            this.myForm.controls['Imagen'].setValue('');
            Swal.fire({
              title: 'Cuenta creada con exito',
              text: "Debe verificar su email",
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'ok'
            }).then((result) => {
              if (result.isConfirmed) {
                this.rtr.navigateByUrl('welcome');
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
        });
    } else {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  isValidField(field: string) {
    return this.vs.isValidField(this.myForm, field);
  }

  cargarImagen(event: any) {
    let archivos = event.target.files;
    let nombre = this.myForm.controls['Nombre'].value;
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
        this.myForm.controls['Imagen'].setValue(urlImagen);
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}
