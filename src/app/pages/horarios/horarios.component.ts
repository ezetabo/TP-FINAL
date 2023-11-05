
import { Component, OnInit } from '@angular/core';
import { Dia, Hora, HorarioLaboral, generarDisponible } from 'src/app/interface/horario-laboral.interface';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.css']
})
export class HorariosComponent implements OnInit {
  public dias = [
    { nombre: Dia.lunes, editable: false, cargado: false },
    { nombre: Dia.martes, editable: false, cargado: false },
    { nombre: Dia.miercoles, editable: false, cargado: false },
    { nombre: Dia.jueves, editable: false, cargado: false },
    { nombre: Dia.viernes, editable: false, cargado: false },
    { nombre: Dia.sabado, editable: false, cargado: true }
  ];

  public horas: Hora[] = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30', '18:00', '18:30', '19:00'
  ];


  public usuario!: UsuarioGral;
  public horario!: HorarioLaboral;
  public horaInicio!: Hora ;
  public horaFin!: Hora;

  public seleccionesHoras: { [key in Dia]?: { horaInicio: string, horaFin: string } } = {};

  constructor(private msj:MensajeroService){
    this.dias.forEach(dia => {
      this.seleccionesHoras[dia.nombre] = { horaInicio: '', horaFin:  ''};
    });
  }

  ngOnInit(): void {

  }

  public filtrarHoras(dia: Dia, hora: Hora = '14:00'): Hora[] {
    if (dia === Dia.sabado) {
      return this.horas.filter(x => x <= hora);
    }
    return this.horas;
  }

  public getCardClass(dia: any): string {
    return dia.editable ? 'card-blue' : 'card-gris';
  }

  public cargarhorario(dia: Dia): void {
    const selecciones = this.seleccionesHoras[dia];
    if (selecciones) {
      const { horaInicio, horaFin } = selecciones;
      this.horario = generarDisponible(dia, this.msj.getCurrentUser(), horaInicio as Hora, horaFin as Hora);
      console.log(this.horario);
    }
  }


}
