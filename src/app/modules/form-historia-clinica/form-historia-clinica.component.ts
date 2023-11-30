import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Datos, HistoriaClinica } from 'src/app/interface/historia-clinica.interface';
import { Paciente } from 'src/app/interface/usuario-gral.interface';
import { HistoriaClinicaDBService } from 'src/app/service/historiaClincaDB.service';
import { obtenerUltimaHistoria } from 'src/app/utils/listas';
import { ValidatorsService } from 'src/app/validators/validators.service';

@Component({
  selector: 'app-form-historia-clinica',
  templateUrl: './form-historia-clinica.component.html',
  styleUrls: ['./form-historia-clinica.component.css']
})
export class FormHistoriaClinicaComponent implements OnInit {

  @Input() readOnlyMode: boolean = false;
  @Input() verPerfil: boolean = false;
  @Input() paciente: Paciente | null = null;
  @Output() salidaHistoria = new EventEmitter<HistoriaClinica>();
  @Output() ver = new EventEmitter<boolean>();

  public historiaClinica: HistoriaClinica | null = null;
  public clave: FormControl = new FormControl('', [Validators.required]);
  public valor: FormControl = new FormControl('', [Validators.required]);
  public claves: string[] = [];
  public nuevoDato: Datos = {};
  public myForm: FormGroup = this.fb.group({
    altura: ['', [Validators.required, Validators.pattern(this.vs.numberPattern), Validators.min(50), Validators.max(230)]],
    peso: ['', [Validators.required, Validators.pattern(this.vs.decimalPattern), Validators.min(1), Validators.max(300)]],
    temperatura: ['', [Validators.required, Validators.pattern(this.vs.decimalPattern), Validators.min(35), Validators.max(42)]],
    presion: ['', [Validators.required, Validators.pattern(this.vs.presionPattern)]],
    datos: this.fb.array([], [Validators.maxLength(3)]),
    paciente:[],
    fecha:[],
  });

  constructor(private fb: FormBuilder, private vs: ValidatorsService, private hcDB: HistoriaClinicaDBService) { }

  ngOnInit(): void {

    this.hcDB.getDatoPorId(this.paciente!).then(his => {
      if (his) {
        console.log(his);

        this.historiaClinica = obtenerUltimaHistoria(his);
        console.log(this.historiaClinica);

        if (this.historiaClinica) {
          this.myForm.setValue(this.historiaClinica);
        }
      }
    })


  }

  onSubmit() {
    if (this.myForm.valid) {
      this.getHistoriaClick();
    } else {
      this.myForm.markAllAsTouched();
      return;
    }
  }

  isValidField(field: string) {
    return this.vs.isValidField(this.myForm, field);
  }

  get datos() {
    return this.myForm.get('datos') as FormArray;
  }

  onDeleteDatos(i: number): void {
    this.datos.removeAt(i);
    this.claves.splice(i, 1);
  }

  onAddDatos(): void {
    if (this.clave.invalid) return;
    if (this.valor.invalid) return;
    this.nuevoDato = {
      [this.clave.value]: this.valor.value,
    }
    this.claves.push(this.clave.value);
    this.datos.push(this.fb.control(this.nuevoDato, [Validators.required]));
    this.clave.reset();
    this.valor.reset();
  }

  getHistoriaClick() {
    this.historiaClinica = this.myForm.value;
    this.historiaClinica!.paciente = this.paciente!;
    this.salidaHistoria.emit(this.historiaClinica!);
    this.clean();
  }

  clean() {
    this.clave.reset()
    this.valor.reset();
    this.claves = [];
    this.nuevoDato = {};
    this.datos.reset();
    this.paciente = null;
    this.myForm.reset();
  }

  verHistoria(){
    this.ver.emit(false);
  }
}
