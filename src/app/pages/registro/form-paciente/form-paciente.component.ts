import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Paciente } from 'src/app/interface/paciente.interface';
import { AuthService } from 'src/app/service/auth.service';
import { PacienteDBService } from 'src/app/service/pacienteDB.service';
import { StorageService } from 'src/app/service/storage.service';
import { getObrasSociales } from 'src/app/utils/listas';
import { ValidatorsService } from 'src/app/validators/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent {

  public paciente: Paciente = {
    id:'',
    Nombre: '',
    Apellido: '',
    Edad: 0,
    Dni: '',
    Email: '',
    Password: '',
    Imagen: '',
    Imagen2: '',
    ObraSocial: ''
  };

  public showPassword: boolean = false;
  public lista: string[] = [];

  public otra: FormControl = new FormControl('', Validators.required)
  public myForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.pattern(this.vs.namePattern)]],
    Apellido: ['', [Validators.required, Validators.pattern(this.vs.namePattern)]],
    Edad: ['', [Validators.required, Validators.pattern(this.vs.numberPattern), Validators.min(1), Validators.max(120)]],
    Dni: ['', [Validators.required, Validators.pattern(this.vs.numberPattern), Validators.maxLength(9), Validators.minLength(6)]],
    ObraSocial: ['', [Validators.required]],
    Email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    Password: ['', [Validators.required]],
    Imagen1: ['', [Validators.required]],
    Imagen2: ['', [Validators.required]],
  });


  constructor(private fb: FormBuilder, private vs: ValidatorsService, private pacienteDB: PacienteDBService,
    private storageService: StorageService, private authService: AuthService, private rtr: Router) {

  }



  ngOnInit(): void {
    this.lista = getObrasSociales();
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.paciente = this.myForm.value;
      const { Email, Password } = this.paciente;
      this.authService.registerUser(Email, Password)
        .then(res => {
          if (res) {
            this.pacienteDB.addData(this.paciente!);
            this.myForm.reset();
            this.myForm.controls['Imagen1'].setValue('');
            this.myForm.controls['Imagen2'].setValue('');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Creacion exitosa',
              showConfirmButton: false,
              timer: 1500

            })
            this.rtr.navigateByUrl('welcome');
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

  cargarImagen(event: any, posicion: number): void {
    let archivos = event.target.files;
    let nombre = this.myForm.controls['Nombre'].value;
    let reader = new FileReader();
    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
        if (posicion === 1) {
          this.myForm.controls['Imagen1'].setValue(urlImagen);
        } else if (posicion === 2) {
          this.myForm.controls['Imagen2'].setValue(urlImagen);
        }
      });
    }


  }



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


}
