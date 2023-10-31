import { Component, Input, OnInit } from '@angular/core';

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/validators/validators.service';
import Swal from 'sweetalert2';
import { Especialista } from 'src/app/interface/especialista.interface';
import { EspecialistaDBService } from 'src/app/service/especialistaDB.service';
import { getEspecialidad } from 'src/app/utils/listas';
import { StorageService } from 'src/app/service/storage.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrls: ['./form-especialista.component.css']
})
export class FormEspecialistaComponent implements OnInit {

  @Input() habilitar: boolean = false;

  public especialista: Especialista = {
    id:'',
    Nombre: '',
    Apellido: '',
    Edad: 0,
    Dni: '',
    Email: '',
    Password: '',
    Imagen: '',
    Especialidades: [],
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
    Especialidades: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    Email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    Password: ['', [Validators.required]],
    Imagen: ['', [Validators.required]],
    Autorizado: [false, [Validators.required]]
  });


  constructor(private fb: FormBuilder, private vs: ValidatorsService, private especialistaDB: EspecialistaDBService,
    private storageService: StorageService, private authService: AuthService, private rtr: Router) {

  }

  get Especialidades() {
    return this.myForm.get('Especialidades') as FormArray;
  }

  ngOnInit(): void {
    this.lista = getEspecialidad();
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.especialista = this.myForm.value;
      const { Email, Password } = this.especialista;
      this.authService.registerUser(Email, Password)
        .then(res => {
          if (res) {
            this.especialistaDB.addData(this.especialista!);
            this.Especialidades.clear();
            this.myForm.reset();
            this.myForm.controls['Imagen'].setValue('');

            Swal.fire({
              title: 'Cuenta creada con exito',
              text: "Debe verificar su email y esperar la aceptacion por parte de un administrador!",
              icon: 'warning',
              showCancelButton: false,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'ok'
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Gracias, en breve podra acceder desde el login'
                )
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

  onDeleteEspecialidades(i: number) {
    this.Especialidades.removeAt(i);
  }

  agregarEspecialidad(event: any) {
    const selectedOptions = Array.from(event.target.selectedOptions, (option: HTMLOptionElement) => option.value.toLowerCase());
    const especialidades = this.Especialidades.value.map((opcion: string) => opcion.toLowerCase());
    selectedOptions.forEach((opcion: string) => {
      if (!especialidades.includes(opcion)) {
        this.Especialidades.push(this.fb.control(opcion));
      }
    });
  }

  agregarOtraEspecialidad() {
    if (this.otra.invalid) {
      return;
    }
    const otraValue = this.otra.value.toLowerCase();
    const especialidades = this.Especialidades.value.map((valor: string) => valor.toLowerCase());
    if (!especialidades.includes(otraValue)) {
      this.Especialidades.push(new FormControl(this.otra.value));
    } else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'ya existe',
        showConfirmButton: false,
        timer: 1500
      })
    }
    this.otra.reset();
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }



}
