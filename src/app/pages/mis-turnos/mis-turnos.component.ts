import { Component, OnInit } from '@angular/core';
import { Estado, Turno } from 'src/app/interface/turno.interface';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { TurnosDBService } from 'src/app/service/turnosDB.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public turnos: Turno[] = [];
  public miTurno: Turno | null = null;
  public turnosFiltrados: Turno[] = [];
  public usuario: UsuarioGral = {
    id: 'lSsjyfvFWMBdRmKknZMq',
    Nombre: 'German',
    Apellido: 'Parada',
    Edad: 22,
    Dni: '49123123',
    Email: '',
    Password: '',
    Imagen: '',
    Rol: 'especialista',
    Especialidades: [],
    Autorizado: true,
    Imagen2: '',
    ObraSocial: '',
  }


  public filtro: String = '';
  public verTurnos: boolean = false;

  constructor(private trnServ: TurnosDBService, private msj: MensajeroService) { }
  ngOnInit(): void {
    this.usuario = this.msj.getCurrentUser();
    this.trnServ.getData(this.usuario).subscribe(x => {
      this.turnos = x;
    });
  }

  getTurno(turno: Turno) {
    this.miTurno = turno;
  }

  filtrar(tipo: string) {
    this.verTurnos = false;
    this.miTurno = null;
    this.filtro = tipo;
  }

  filtrarPorEspecialista(trn: Turno) {
    this.turnosFiltrados = this.turnos.filter(t => t.especialista.id == trn.especialista.id);
    this.miTurno = null;
    this.verTurnos = true;
  }

  filtrarPorEspecialidad(trn: Turno) {
    this.turnosFiltrados = this.turnos.filter(t => t.especialidad == trn.especialidad);
    this.miTurno = null;
    this.verTurnos = true;

  }
  filtrarPorPaciente(trn: Turno) {
    this.turnosFiltrados = this.turnos.filter(t => t.paciente.id == trn.paciente.id);
    this.miTurno = null;
    this.verTurnos = true;
  }


  calificar(numEstrella: number) {
    for (let i = 1; i <= numEstrella; i++) {
      const checkbox = document.getElementById(`estrella${i}`) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = true;
      }
    }
    for (let i = numEstrella + 1; i <= 5; i++) {
      const checkbox = document.getElementById(`estrella${i}`) as HTMLInputElement;
      if (checkbox) {
        checkbox.checked = false;
      }
    }
    this.miTurno!.calificacion = numEstrella;
    this.guardar();

  }

  guardar() {
    this.trnServ.modificar(this.miTurno!);
  }

  limpiar() {
    this.miTurno = null;
    this.turnosFiltrados = [];
    this.filtro = '';
    this.verTurnos = false;
  }

  async finalizar() {
    const { value: formValues } = await Swal.fire({
      title: "Debe completar ambos campos",
      html: `
        <div class="container">
          <div class="row m-5">
            <div class="col-5">
              <label for="swal-input1">Reseña</label>
            </div>
            <div class="col-7">
              <textarea id="swal-input1" class="swal2-input"></textarea>
            </div>
            <div class="col-5 mt-3">
              <label for="swal-input2">Diagnóstico</label>
            </div>
            <div class="col-7 mt-3">
              <textarea id="swal-input2" class="swal2-input"></textarea>
            </div>
          </div>
        </div>`,
      focusConfirm: false,
      preConfirm: () => {
        const input1 = document.getElementById("swal-input1") as HTMLTextAreaElement;
        const input2 = document.getElementById("swal-input2") as HTMLTextAreaElement;
        const valor1: string = input1.value.trim();
        const valor2: string = input2.value.trim();
        if (!valor1 || !valor2) {
          Swal.showValidationMessage("Ambos campos son obligatorios");
        }
        return [valor1, valor2];
      }
    });

    if (formValues) {
      this.miTurno!.resenia = formValues[0];
      this.miTurno!.diagnostico = formValues[1];
      this.miTurno!.estado = Estado.finalizado;
      this.guardar();
      this.limpiar();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operacion realizada con exito",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  async cancelar() {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Debe dejar un comentario",
      showCancelButton: true,
      preConfirm: (inputValue) => {
        if (!inputValue || inputValue.length < 10) {
          Swal.showValidationMessage("El comentario debe tener un minimo de 10 caracteres");
        }
      }
    });
    if (text) {
      this.miTurno!.comentario = text;
      this.miTurno!.estado = Estado.cancelado;
      this.guardar();
      this.limpiar();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operacion realizada con exito",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  aceptar() {
    this.miTurno!.estado = Estado.aceptado;
    this.guardar();
    this.limpiar();
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Operacion realizada con exito",
      showConfirmButton: false,
      timer: 1500
    });
  }

  async rechazar() {
    const { value: text } = await Swal.fire({
      input: "textarea",
      inputLabel: "Debe dejar un comentario",
      showCancelButton: true,
      preConfirm: (inputValue) => {
        if (!inputValue || inputValue.length < 10) {
          Swal.showValidationMessage("El comentario debe tener un minimo de 10 caracteres");
        }
      }
    });
    if (text) {
      this.miTurno!.comentario = text;
      this.miTurno!.estado = Estado.rechazado;
      this.guardar();
      this.limpiar();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operacion realizada con exito",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


}
