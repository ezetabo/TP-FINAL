import { Component, OnInit } from '@angular/core';
import { CronogramaAtencion, EspecialistaTurnos, deepCopy } from 'src/app/interface/cronograma-atencion.interface';
import { CronogramaEspecialista, Dia, Fecha, Horario } from 'src/app/interface/horario-laboral.interface';
import { CronogramaEspecialistaDBService } from 'src/app/service/cronogramaEspecialistaDB.service';
import { CronogramaTurnosDBService } from 'src/app/service/cronogramaTurnosDB.service';
import { obtenerFechaActual, ordenarCronograma } from 'src/app/utils/listas';
import { CronogrmaQuincena } from '../../../interface/cronograma-atencion.interface';
import { Lista } from 'src/app/interface/listas.interface';
import { EspcialidadDBService } from '../../../service/espcialidadDB.service';
import { Especialista, Paciente, UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import Swal from 'sweetalert2';
import { Estado, Turno } from 'src/app/interface/turno.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { UsuarioGralDBService } from 'src/app/service/usuarioGralDB.service';
import { TurnosDBService } from 'src/app/service/turnosDB.service';

@Component({
  selector: 'app-horarios-turnos',
  templateUrl: './horarios-turnos.component.html',
  styleUrls: ['./horarios-turnos.component.css']
})
export class HorariosTurnosComponent implements OnInit {

  public verTurnos: boolean = false;
  public cronoQuincena: CronogrmaQuincena = { id: '', quincena: [] };

  public cronogramasEspecialistas: CronogramaEspecialista[] = [];
  public cronogramaAtencion: CronogramaAtencion[] = [];
  public mostrar: CronogramaAtencion[] = [];

  public listaEspecialidaes: Lista[] = [];
  public especialidadElegida: string = "";
  public filtro: string = '';
  public paciente: Paciente | null = null;
  public usuario: UsuarioGral | null = null;
  public pacientes: UsuarioGral[] = [];

  constructor(private crnTurnos: CronogramaTurnosDBService, private crnEsp: CronogramaEspecialistaDBService,
    private trnDB: TurnosDBService, private especialidadesDB: EspcialidadDBService, private msj: MensajeroService,
    private usS: UsuarioGralDBService) { }

  ngOnInit(): void {
    this.usS.getData().subscribe(usuarios => {
      usuarios.forEach(x => {
        if (x.Rol == 'paciente' && !this.pacientes.some(u => u.id === x.id)) {
          this.pacientes.push(x);
        }
      });
    });
    this.usuario = this.msj.getCurrentUser();
    if (this.usuario.Rol == 'paciente') {
      this.paciente = { id: this.usuario.id, Nombre: this.usuario.Nombre, Apellido: this.usuario.Apellido };
    }
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

  filtrarPorEspecialista(esp: Especialista) {
    this.mostrar = this.mostrar.filter((cronograma) => {
      cronograma.turnos = cronograma.turnos.filter(turno => turno.especialista.id === esp.id);
      return cronograma.turnos.length > 0;
    });
    this.switchear();
  }

  filtrarPorEspecialidad(especialidadDeseada: string = 'cardiologia'): void {
    this.especialidadElegida = especialidadDeseada;
    this.mostrar = this.mostrar.filter((cronograma) => {
      cronograma.turnos = cronograma.turnos.filter(turno => turno.especialista.Especialidades.some((esp) =>
        esp.toLowerCase() == especialidadDeseada.toLowerCase()));
      return cronograma.turnos.length > 0;
    });
    this.switchear();
  }

  todos() {
    this.crnTurnos.getDataQuincena().then(q => {
      if (q) {
        this.cronoQuincena = q;
        this.cronoQuincena.quincena = ordenarCronograma(this.cronoQuincena.quincena);
        this.mostrar = deepCopy(q.quincena);
        this.quitarAyer();
      }
    });
  }

  inicioCronograma() {
    for (let index = 0; index < 15; index++) {
      const fecha: Fecha = obtenerFechaActual(index)
      if (fecha.dia == Dia.domingo) {
        continue;
      }
      this.cronogramaAtencion.push(this.agregarNuevoEspecialista(obtenerFechaActual(index)));
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

  quitarAyer() {
    const fechaActual: Fecha = obtenerFechaActual(0);
    const primerFechaQuicena: Fecha = this.cronoQuincena.quincena[0].fecha
    if (fechaActual.fecha != primerFechaQuicena.fecha) {
      this.crnTurnos.addData(this.cronoQuincena.quincena.shift()!);
      this.crnTurnos.modificarQuincena(this.cronoQuincena);
    } else {
      console.log('es la fecha actual');
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

  filtrar(tipo: string = '') {
    this.filtro = tipo;
  }

  elegirTurno(horario: Horario, dia: CronogramaAtencion) {
    Swal.fire({
      title: "Confirmar seleccion",
      text: `Fecha: ${dia.fecha.fecha} - Horario: ${horario.hora} -
             Especialista: ${dia.turnos[0].especialista.Apellido}, ${dia.turnos[0].especialista.Nombre}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes!"
    }).then((result) => {
      if (result.isConfirmed) {
        const quincenaFecha = this.cronoQuincena.quincena.find(x => x.fecha.fecha === dia.fecha.fecha);
        if (quincenaFecha) {
          const especialistaTurno = quincenaFecha.turnos.find(y => y.especialista.id === dia.turnos[0].especialista.id);
          if (especialistaTurno) {
            horario.disponible = !horario.disponible;
            especialistaTurno.turnos = dia.turnos[0].turnos;
            const turno: Turno = {
              id: '',
              especialidad: this.especialidadElegida ? this.especialidadElegida : ' --- ',
              especialista: dia.turnos[0].especialista,
              paciente: this.paciente!,
              estado: Estado.reservado,
              comentario: '',
              resenia: '',
              encuesta: '',
              calificacion: 0,
              fecha: dia.fecha.fecha,
              dia: dia.fecha.dia,
              hora: horario.hora
            }
            this.trnDB.addData(turno);
            this.crnTurnos.modificarQuincena(this.cronoQuincena);
            this.clean();
          }
        }

        Swal.fire({
          title: "Reservado!",
          text: "Recuerde estar 15 antes del horario",
          icon: "success"
        });
      } else {
        this.clean();
      }
    });

  }

  switchear() {
    this.verTurnos = !this.verTurnos;
  }

  clean() {
    this.switchear();
    this.especialidadElegida = '';
    this.filtro = '';
    if (this.usuario!.Rol == 'admin') {
      this.paciente = null;
    }
    this.todos();
  }

  seleccionarPaciente(pac: UsuarioGral) {
    this.paciente = {
      id: pac.id,
      Nombre: pac.Nombre,
      Apellido: pac.Apellido
    }
    console.table(this.paciente)
  }











}
