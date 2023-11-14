import { Component, OnInit } from '@angular/core';
import { CronogramaAtencion, EspecialistaTurnos, deepCopy } from 'src/app/interface/cronograma-atencion.interface';
import { CronogramaEspecialista, Dia, Fecha } from 'src/app/interface/horario-laboral.interface';
import { CronogramaEspecialistaDBService } from 'src/app/service/cronogramaEspecialistaDB.service';
import { CronogramaTurnosDBService } from 'src/app/service/cronogramaTurnosDB.service';
import { obtenerFechaActual, ordenarCronograma } from 'src/app/utils/listas';
import { CronogrmaQuincena } from '../../../interface/cronograma-atencion.interface';
import { Lista } from 'src/app/interface/listas.interface';
import { EspcialidadDBService } from '../../../service/espcialidadDB.service';
import { Especialista } from 'src/app/interface/usuario-gral.interface';

@Component({
  selector: 'app-horarios-turnos',
  templateUrl: './horarios-turnos.component.html',
  styleUrls: ['./horarios-turnos.component.css']
})
export class HorariosTurnosComponent implements OnInit {

  public verTurnos: boolean = false;
  public verSeleccion: boolean = true;
  public cronoQuincena: CronogrmaQuincena = { id: '', quincena: [] };

  public cronogramasEspecialistas: CronogramaEspecialista[] = [];
  public cronogramaAtencion: CronogramaAtencion[] = [];
  public mostrar: CronogramaAtencion[] = [];

  public filtro: string = '';
  public listaEspecialidaes: Lista[] = [];
  public especialidadElegida: string = "";

  constructor(private crnTurnos: CronogramaTurnosDBService, private crnEsp: CronogramaEspecialistaDBService,
    private especialidadesDB: EspcialidadDBService) { }

  ngOnInit(): void {
    this.especialidadesDB.getData().subscribe(x => {
      this.listaEspecialidaes = x;
    });
    this.crnEsp.getData().subscribe(x => {
      this.cronogramasEspecialistas = x;
    });
    this.todos();
  }

  agregarNuevoEspecialista(fecha: Fecha): CronogramaAtencion {
    let horario: CronogramaAtencion = { id: '', fecha: fecha, turnos: [] };
    this.cronogramasEspecialistas.forEach((esp) => {
      esp.misHorarios.forEach((turno) => {
        if (turno.nombre === fecha.dia && turno.cargado) {
          const crono: EspecialistaTurnos = { especialista: esp.especialista, turnos: turno.turnos };
          const existeEspecialista = horario.turnos.some((item) => item.especialista.id === crono.especialista.id);
          if (!existeEspecialista) {
            horario.turnos.push(crono);
          }
        }
      });
    });

    return horario;
  }

  filtrarPorEspecialista(esp:Especialista) {
    this.mostrar = this.mostrar.filter((cronograma) => {
      cronograma.turnos = cronograma.turnos.filter(turno => turno.especialista.id === esp.id);
      return cronograma.turnos.length > 0;
    });
    this.verTurnos = !this.verTurnos;
    this.verSeleccion = !this.verSeleccion;
  }

  filtrarPorEspecialidad(especialidadDeseada: string = 'cardiologia'): void {
    console.log(especialidadDeseada);
    this.mostrar = this.mostrar.filter((cronograma) => {
      cronograma.turnos = cronograma.turnos.filter(turno => turno.especialista.Especialidades.some((esp) =>
        esp.toLowerCase() == especialidadDeseada.toLowerCase()));
      return cronograma.turnos.length > 0;
    });
    this.verTurnos = !this.verTurnos;
    this.verSeleccion = !this.verSeleccion;
  }

  todos() {
    this.crnTurnos.getDataQuincena().then(q => {
      if (q) {
        this.cronoQuincena = q;
        this.cronoQuincena.quincena = ordenarCronograma(this.cronoQuincena.quincena);
        this.mostrar = q.quincena;
        this.rotarCronograma();
      }
    });
  }

  inicioCronograma() {
    if (this.cronogramaAtencion.length > 0) {
      console.log('ya existe un cronograma');

    } else {
      for (let index = 0; index < 15; index++) {
        const fecha: Fecha = obtenerFechaActual(index)
        if (fecha.dia == Dia.domingo) {
          continue;
        }
        this.cronogramaAtencion.push(this.agregarNuevoEspecialista(obtenerFechaActual(index)));
      }
    }
    this.cronoQuincena.quincena = this.cronogramaAtencion;
    this.crnTurnos.addDataQuincena(this.cronoQuincena);
  }

  rotarCronograma() {
    const fechaActual: Fecha = obtenerFechaActual(0);
    const primerFechaQuicena: Fecha = this.cronoQuincena.quincena[0].fecha
    if (fechaActual.fecha != primerFechaQuicena.fecha) {
      this.crnTurnos.addData(this.cronoQuincena.quincena.shift()!);
      const crono = this.crearCronogramaDiario(15);
      if (crono) {
        this.cronoQuincena.quincena.push(crono);
        this.crnTurnos.modificarQuincena(this.cronoQuincena);
      }
    } else {
      console.log('no es necesario rotar');
    }
  }

  crearCronogramaDiario(cantDias: number): CronogramaAtencion | false {
    const fecha: Fecha = obtenerFechaActual(cantDias)
    if (fecha.dia == Dia.domingo) {
      return false;
    } else {
      return this.agregarNuevoEspecialista(fecha);
    }
  }

  ocultar() {
    this.verTurnos = !this.verTurnos;
  }

  filtrar(tipo: string = '') {
    this.filtro = tipo;
  }

  verEspecialidades() {

  }















}
