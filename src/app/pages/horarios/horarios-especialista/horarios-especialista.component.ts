
import { Component, OnInit } from '@angular/core';
import { CronogramaEspecialista, Dia, Hora } from 'src/app/interface/horario-laboral.interface';
import { Especialista } from 'src/app/interface/usuario-gral.interface';
import { CronogramaEspecialistaDBService } from 'src/app/service/cronogramaEspecialistaDB.service';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { validarHoras } from 'src/app/utils/listas';
import Swal from 'sweetalert2';
import { generarDisponible } from '../../../interface/horario-laboral.interface';

@Component({
  selector: 'app-horarios-especialista',
  templateUrl: './horarios-especialista.component.html',
  styleUrls: ['./horarios-especialista.component.css']
})
export class HorariosEspecialistaComponent implements OnInit {

  public cronograma: CronogramaEspecialista = {
    id: '',
    especialista: { id: '', Nombre: '', Apellido: '', Especialidades: [] },
    misHorarios: [
      { nombre: Dia.lunes, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '', turnos: [] },
      { nombre: Dia.martes, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '', turnos: [] },
      { nombre: Dia.miercoles, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '', turnos: [] },
      { nombre: Dia.jueves, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '', turnos: [] },
      { nombre: Dia.viernes, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '', turnos: [] },
      { nombre: Dia.sabado, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '', turnos: [] }
    ]
  }

  public horas: Hora[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00'
  ];


  constructor(private msj: MensajeroService, private crn: CronogramaEspecialistaDBService) { }

  ngOnInit(): void {
    if (this.msj.getCurrentUser().id) {
      this.crn.getDatoPorId(this.msj.getCurrentUser().id).then(x => {
        if (x) {
          this.cronograma = x;
        }
      });
    }
  }

  public filtrarHoras(dia: Dia, hora: Hora = '14:00'): Hora[] {
    if (dia === Dia.sabado) {
      return this.horas.filter(x => x <= hora);
    }
    return this.horas;
  }

  public cargarhorario(dia: Dia, quitar: boolean = false): void {
    const selecciones = this.cronograma.misHorarios.find(x => x.nombre === dia);
    if (selecciones) {
      const { horaInicio, horaFin } = selecciones;
      if (validarHoras(horaInicio as Hora, horaFin as Hora) || quitar) {
        const { id, Nombre, Apellido, Especialidades } = this.msj.getCurrentUser();
        const especialista: Especialista = { id: id, Nombre: Nombre, Apellido: Apellido, Especialidades: Especialidades };
        selecciones.cargado = !quitar;
        if (quitar) {
          selecciones.editable = false,
            selecciones.horaFin = '';
          selecciones.horaInicio = '';
          selecciones.turnos = []
        } else {
          selecciones.turnos = generarDisponible(horaInicio as Hora, horaFin as Hora)
        }
        this.cronograma.id = especialista.id;
        this.cronograma.especialista = especialista;
        this.crn.addData(this.cronograma);
      } else {
        Swal.fire('La hora de salida debe ser superior a la de inicio');
      }
    }
  }

  public quitar(dia: Dia): void {
    this.cargarhorario(dia, true);
  }

}
