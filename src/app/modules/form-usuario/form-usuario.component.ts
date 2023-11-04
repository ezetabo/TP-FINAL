import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Lista } from 'src/app/interface/listas.interface';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { EspcialidadDBService } from 'src/app/service/espcialidadDB.service';
import { ObraSocialDBService } from 'src/app/service/obraSocialDB.service';
import { StorageService } from 'src/app/service/storage.service';
import { ordenarLista } from 'src/app/utils/listas';
import { ValidatorsService } from 'src/app/validators/validators.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {
  @Input() habilitar: boolean = false;
  @Input() isReadonly: boolean = false;
  @Input() rol: string = '';
  @Input() usuarioGral: UsuarioGral = {
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

  @Output() public getUsuario = new EventEmitter<UsuarioGral>();



  public showPassword: boolean = false;
  public listaObs: Lista[] = [];
  public listaEsp: Lista[] = [];
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
    Imagen2: ['', [Validators.required]],
    ObraSocial: ['', [Validators.required]],
  });


  constructor(private fb: FormBuilder, private vs: ValidatorsService, private storageService: StorageService,
    private espDB: EspcialidadDBService, private obrasDB: ObraSocialDBService) { }

  ngOnInit(): void {

    if (this.rol == 'paciente') {
      this.cargarObras();
      this.myForm.get('Especialidades')!.clearValidators();
    } else if (this.rol == 'especialista') {
      this.cargarEspcialidades()
      this.myForm.get('Imagen2')!.clearValidators();
      this.myForm.get('ObraSocial')!.clearValidators();
    } else if (this.rol == 'admin') {
      this.myForm.get('Imagen2')!.clearValidators();
      this.myForm.get('ObraSocial')!.clearValidators();
      this.myForm.get('Especialidades')!.clearValidators();
    }
    this.myForm.patchValue(this.usuarioGral);
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.getUsuarioClick();
      this.myForm.controls['Imagen'].setValue('');
      this.myForm.controls['Imagen2'].setValue('');
      this.Especialidades.reset();
      this.myForm.reset(this.usuarioGral);
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
      if(!this.listaEsp.find(x => x.nombre.toLowerCase() ==  this.otra.value.toLowerCase())){
        this.espDB.addData({ id: '', nombre: this.otra.value });
      }
      this.cargarEspcialidades();
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
    if(this.rol == 'especialista'){
      this.usuarioGral.Autorizado = false;
    }
    this.getUsuario.emit(this.usuarioGral);
    this.myForm.controls['Imagen'].setValue('');
    this.myForm.controls['Imagen2'].setValue('');
    this.Especialidades.reset();
    this.myForm.reset(this.usuarioGral);
  }

  cargarObras() {
    this.obrasDB.getData().subscribe(x => {
      this.listaObs = ordenarLista(x)
    });
  }

  cargarEspcialidades() {
    this.espDB.getData().subscribe(x => {
      this.listaEsp = ordenarLista(x)
    });
  }
}
