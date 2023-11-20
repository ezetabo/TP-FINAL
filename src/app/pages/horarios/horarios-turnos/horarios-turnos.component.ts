import { Component, OnInit } from '@angular/core';
import { CronogramaAtencion, EspecialistaTurnos, deepCopy, } from 'src/app/interface/cronograma-atencion.interface';
import { CronogramaEspecialista, Dia, Fecha, Horario } from 'src/app/interface/horario-laboral.interface';
import { CronogramaEspecialistaDBService } from 'src/app/service/cronogramaEspecialistaDB.service';
import { obtenerFechaActual } from 'src/app/utils/listas';
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

  public cronogramasEspecialistas: CronogramaEspecialista[] = [];
  public mostrar: CronogramaAtencion[] = [];
  public turnos: Turno[] = [];

  public listaEspecialidaes: Lista[] = [];
  public listaEspeMed: Lista[] = [];
  public especialidadElegida: string = "";
  public paciente: Paciente | null = null;
  public usuario: UsuarioGral | null = null;
  public especialista: Especialista | null = null;
  public pacientes: UsuarioGral[] = [];

  constructor(private crnEsp: CronogramaEspecialistaDBService, private usS: UsuarioGralDBService,
    private trnDB: TurnosDBService, private especialidadesDB: EspcialidadDBService, private msj: MensajeroService) { }


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
      this.paciente = { id: this.usuario.id, Nombre: this.usuario.Nombre, Apellido: this.usuario.Apellido,
      Imagen: this.usuario.Imagen, Imagen2: this.usuario.Imagen2};
    }
    this.especialidadesDB.getData().subscribe(x => this.listaEspecialidaes = x);
    this.crnEsp.getData().subscribe(x => {
      this.cronogramasEspecialistas = x;
      this.cargarTurnos();
    });
  }

  crearDiaLaboral(fecha: Fecha): CronogramaAtencion {
    let horario: CronogramaAtencion = { fecha: fecha, turnos: [] };
    this.cronogramasEspecialistas.forEach(esp => {
      esp.misHorarios.forEach(hor => {
        if (hor.cargado && hor.nombre == fecha.dia) {
          hor.turnos.forEach(trn => {
            trn.disponible = this.checkearDisponible(esp.especialista, trn, fecha);
          })
          const espTurno: EspecialistaTurnos = { especialista: esp.especialista, fecha: fecha, turnos: deepCopy(hor.turnos) }
          const existeEspecialista = horario.turnos.some((item) => item.especialista.id == espTurno.especialista.id);
          if (!existeEspecialista) {
            horario.turnos.push(espTurno);
          }
        }
      });
    });
    return horario;
  }

  checkearDisponible(esp: Especialista, hr: Horario, fecha: Fecha): boolean {
    let disponible = true;
    if (this.turnos.length > 0) {
      this.turnos.forEach((x) => {
        if (x.especialista.id == esp.id && x.fecha == fecha.fecha && x.hora == hr.hora) {
          disponible = false;
        }
      });
    }
    return disponible;
  }

  inicioCronograma() {
    for (let index = 0; index < 15; index++) {
      const fecha: Fecha = obtenerFechaActual(index)
      if (fecha.dia == Dia.domingo) {
        continue;
      }
      this.mostrar.push(this.crearDiaLaboral(obtenerFechaActual(index)));
    }
  }

  filtrarPorEspecialista(esp: Especialista): void {
    esp.Especialidades.forEach(x => {
      this.listaEspecialidaes.forEach(y => {
        if (y.nombre.toLowerCase() == x.toLowerCase()) {
          this.listaEspeMed.push(y);
        }
      });
    });
    console.log(this.listaEspeMed);
    this.especialista = esp;
  }

  obtnerTurnos(es:string){
    this.especialidadElegida = es;
   this.mostrar = this.mostrar.filter((cronograma) => {
      cronograma.turnos = cronograma.turnos.filter(turno => turno.especialista.id === this.especialista?.id);
      return cronograma.turnos.length > 0;
    });
    this.switchear();
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
        horario.disponible = !horario.disponible;
        const turno: Turno = {
          id: '',
          especialidad: this.especialidadElegida ? this.especialidadElegida : ' --- ',
          especialista: dia.turnos[0].especialista,
          paciente: this.paciente!,
          estado: Estado.pendiente,
          comentario: '',
          resenia: '',
          encuesta: '',
          calificacion: 0,
          fecha: dia.fecha.fecha,
          dia: dia.fecha.dia,
          hora: horario.hora
        }
        this.trnDB.addData(turno);
        Swal.fire({
          title: "Pendiente de aprobacion!",
          text: "proceso realizado correctamente, se encuentra esperando la aprobacionde un profesional.",
          icon: "success"

        }).then(() => this.clean());
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
    this.mostrar = [];
    this.especialista = null;
    this.listaEspeMed = [];
    if (this.usuario!.Rol == 'admin') {
      this.paciente = null;
    }
    this.cargarTurnos();
  }

  seleccionarPaciente(pac: UsuarioGral) {
    this.paciente = {
      id: pac.id,
      Nombre: pac.Nombre,
      Apellido: pac.Apellido,
      Imagen: pac.Imagen,
      Imagen2: pac.Imagen2,
    }
  }

  cargarTurnos() {
    this.trnDB.getAllData().subscribe(x => {
      this.turnos = x
      this.inicioCronograma();
    });
  }

}
