
import { Component, OnInit } from '@angular/core';
import { Cronograma, Dia, Hora, HorarioLaboral, generarDisponible } from 'src/app/interface/horario-laboral.interface';
import { Especialista } from 'src/app/interface/usuario-gral.interface';
import { CronogramaDBService } from 'src/app/service/cronogramaDB.service';
import { HorarioLaboralDBService } from 'src/app/service/horarioLaboralDB.service';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { validarHoras } from 'src/app/utils/listas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {

  public cronograma: Cronograma = {
    id: '',
    misHorarios: [
      { nombre: Dia.lunes, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '' },
      { nombre: Dia.martes, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '' },
      { nombre: Dia.miercoles, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '' },
      { nombre: Dia.jueves, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '' },
      { nombre: Dia.viernes, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '' },
      { nombre: Dia.sabado, editable: false, cargado: false, horaInicio: '', horaFin: '', id: '' }
    ]
  }

  public horas: Hora[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00'
  ];

  public horario!: HorarioLaboral;


  constructor(private msj: MensajeroService, private crn: CronogramaDBService, private hl: HorarioLaboralDBService) { }

  ngOnInit(): void { }

  public filtrarHoras(dia: Dia, hora: Hora = '14:00'): Hora[] {
    if (dia === Dia.sabado) {
      return this.horas.filter(x => x <= hora);
    }
    return this.horas;
  }

  public cargarhorario(dia: Dia): void {
    const selecciones = this.cronograma.misHorarios.find(x => x.nombre === dia);
    if (selecciones) {
      const { horaInicio, horaFin } = selecciones;
      if (validarHoras(horaInicio as Hora, horaFin as Hora)) {
        const { id, Nombre, Apellido, Especialidades } = this.msj.getCurrentUser();
        const especialista: Especialista = { id: id, Nombre: Nombre, Apellido: Apellido, Especialidades: Especialidades };
        this.horario = generarDisponible(dia, especialista, horaInicio as Hora, horaFin as Hora);
        selecciones.cargado = true;
        this.cronograma.id = especialista.id;
        selecciones.id = this.hl.addData(this.horario);
        this.crn.addData(this.cronograma);
        console.log(this.horario);
      } else {
        Swal.fire('La hora de salida debe ser superior a la de inicio');
      }
    }
  }

}
