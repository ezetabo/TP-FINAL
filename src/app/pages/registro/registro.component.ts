import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { AuthService } from 'src/app/service/auth.service';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { StorageService } from 'src/app/service/storage.service';
import { UsuarioGralDBService } from 'src/app/service/usuarioGralDB.service';
import { getEspecialidad, getObrasSociales } from 'src/app/utils/listas';
import { ValidatorsService } from 'src/app/validators/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-gral',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  @Input() habilitar: boolean = false;
  @Input() public rol: string = '';
  @Output() public getUsuario = new EventEmitter<UsuarioGral>();

  private userNew: UsuarioGral = {
    id: '',
    Nombre: '',
    Apellido: '',
    Edad: 0,
    Dni: '',
    Email: '',
    Password: '',
    Imagen: '',
    Rol: '',
    Especialidades: [],
    Autorizado: true,
    Imagen2: '',
    ObraSocial: '',
  };

  public usuarioGral = this.userNew;
  public showPassword: boolean = false;
  public lista: string[] = [];
  public otra: FormControl = new FormControl('', Validators.required);

  public myForm: FormGroup = this.fb.group({
    Nombre: ['', [Validators.required, Validators.pattern(this.vs.namePattern)]],
    Apellido: ['', [Validators.required, Validators.pattern(this.vs.namePattern)]],
    Edad: ['', [Validators.required, Validators.pattern(this.vs.numberPattern), Validators.min(1), Validators.max(120)]],
    Dni: ['', [Validators.required, Validators.pattern(this.vs.numberPattern), Validators.maxLength(9), Validators.minLength(6)]],
    Email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)]],
    Password: ['', [Validators.required]],
    Imagen: ['', [Validators.required]],
    Especialidades: this.fb.array([], [Validators.required, Validators.minLength(1)]),
    Autorizado: [true, [Validators.required]],
    Imagen2: ['', [Validators.required]],
    ObraSocial: ['', [Validators.required]],
  });


  constructor(private fb: FormBuilder, private vs: ValidatorsService, private usuarioGralDB: UsuarioGralDBService,
    private storageService: StorageService, private authService: AuthService, private rtr: Router,
    private msj: MensajeroService) {

  }
  ngOnInit(): void {

    if (this.rol == '') {
      this.rol = this.msj.leerDato();
    }

    if (this.rol == 'paciente') {
      this.lista = getObrasSociales();
      this.myForm.get('Especialidades')!.clearValidators();
      this.myForm.get('Autorizado')!.clearValidators();
    } else if (this.rol == 'especialista') {
      this.lista = getEspecialidad();
      this.myForm.get('Imagen2')!.clearValidators();
      this.myForm.get('ObraSocial')!.clearValidators();
      this.myForm.controls['Autorizado'].setValue(false);
    } else if (this.rol == 'admin') {
      this.myForm.get('Imagen2')!.clearValidators();
      this.myForm.get('ObraSocial')!.clearValidators();
      this.myForm.get('Especialidades')!.clearValidators();
    }

  }

  onSubmit() {
    if (this.myForm.valid) {
      this.getUsuarioClick();
      const { Email, Password } = this.usuarioGral;
      this.authService.registerUser(Email, Password)
        .then(res => {
          if (res) {
            this.usuarioGralDB.addData(this.usuarioGral!);
            this.myForm.reset();
            this.myForm.controls['Imagen'].setValue('');
            this.myForm.controls['Imagen2'].setValue('');
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Creacion exitosa',
              showConfirmButton: false,
              timer: 1500

            })
            this.usuarioGral = this.userNew
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
          this.myForm.controls['Imagen'].setValue(urlImagen);
        } else if (posicion === 2) {
          this.myForm.controls['Imagen2'].setValue(urlImagen);
        }
      });
    }


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

  onDeleteEspecialidades(i: number) {
    this.Especialidades.removeAt(i);
  }

  get Especialidades() {
    return this.myForm.get('Especialidades') as FormArray;
  }


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  getUsuarioClick() {
    this.usuarioGral = this.myForm.value;
    this.usuarioGral.Rol = this.rol;
    this.getUsuario.emit(this.usuarioGral);
  }

}
