import { Component, OnInit } from '@angular/core';
import { HistoriaClinica } from 'src/app/interface/historia-clinica.interface';
import { Estado, Turno } from 'src/app/interface/turno.interface';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { HistoriaClinicaDBService } from 'src/app/service/historiaClincaDB.service';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { TurnosDBService } from 'src/app/service/turnosDB.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {

  public historiaCreada: boolean = false;
  public verHistoria: boolean = false;
  public turnos: Turno[] = [];
  public miTurno: Turno | null = null;
  public turnosFiltrados: Turno[] = [];
  public usuario: UsuarioGral = {
    id: '02CQz7zyborzUrhUIBQr',
    Nombre: 'Samara',
    Apellido: 'Saldara',
    Edad: 22,
    Dni: '49123123',
    Email: '',
    Password: '',
    Imagen: '',
    Rol: 'admin',
    Especialidades: [],
    Autorizado: true,
    Imagen2: '',
    ObraSocial: '',
  }


  public filtro: String = '';
  public verTurnos: boolean = false;

  constructor(private trnServ: TurnosDBService, private msj: MensajeroService, private hcDB: HistoriaClinicaDBService) { }
  ngOnInit(): void {
    this.usuario = this.msj.getCurrentUser();
    this.cargarTurnos();
  }

  cargarTurnos() {
    this.trnServ.getData(this.usuario).subscribe(x => {
      this.turnos = x;
      this.turnosFiltrados = this.turnos;
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
    this.cargarTurnos();
  }

  async finalizar() {
    if (this.historiaCreada) {
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
    } else {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Primero debe crear la historia clinica",
        showConfirmButton: true,
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


  async encuesta() {
    const { value: formValues } = await Swal.fire({
      title: "Responder encuesta",
      html: `
        <div class="container "">
          <div class="row m-5">
            <div class="col-8">
              <span >Experiencia General:
                ¿Cómo calificaría su experiencia general en nuestra clínica médica?</span>
            </div>
            <div class="col-4">
              <select id="swal-input1" class="swal2-input">
                <option value=""></option>
                <option value="excelente">Excelente</option>
                <option value="buena">Buena</option>
                <option value="regular">Regular</option>
                <option value="mala">Mala</option>
                <option value="muy-mala">Muy Mala</option>
              </select>
            </div>
            <div class="col-8 mt-3">
              <span>Acceso y Tiempos de Espera:
                ¿Cómo calificaría el tiempo de espera para programar una cita médica?</span>
            </div>
            <div class="col-4 mt-3">
              <select id="swal-input2" class="swal2-input">
                <option value=""></option>
                <option value="muy-rapido">Muy Rápido</option>
                <option value="rapido">Rápido</option>
                <option value="aceptable">Aceptable</option>
                <option value="lento">Lento</option>
                <option value="muy-lento">Muy Lento</option>
              </select>
            </div>
            <div class="col-5 mt-3">
              <label for="swal-input3">Sugerencias: </label>
            </div>
            <div class="col-7 mt-3">
              <textarea id="swal-input3" class="swal2-input"></textarea>
            </div>
          </div>
        </div>`,
      focusConfirm: false,
      preConfirm: () => {
        const input1 = document.getElementById("swal-input1") as HTMLSelectElement;
        const input2 = document.getElementById("swal-input2") as HTMLSelectElement;
        const input3 = document.getElementById("swal-input3") as HTMLTextAreaElement;
        const valor1: string = input1.value.trim();
        const valor2: string = input2.value.trim();
        const valor3: string = input3.value.trim();
        if (!valor1 || !valor2 || !valor3) {
          Swal.showValidationMessage("Todos los campos son obligatorios");
        }
        return [valor1, valor2, valor3];
      }
    });

    if (formValues) {
      this.miTurno!.encuesta.experienciaGeneral = formValues[0];
      this.miTurno!.encuesta.accesoTiemposEspera = formValues[1];
      this.miTurno!.encuesta.sugerencias = formValues[2];
      this.miTurno!.estado = Estado.finalizado;
      this.guardar();
      this.limpiar();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operación realizada con éxito",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  historia() {
    this.verHistoria = !this.verHistoria;
    this.verTurnos = !this.verTurnos;
  }

  crearHistoriaClinica(hc: HistoriaClinica) {
    if (hc) {
      this.historiaCreada = true;
      this.hcDB.addData(hc);
      this.historia();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Operación realizada con éxito",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }


   buscarEnObjeto(objeto: any, valor: string): boolean {
    for (const key in objeto) {
      if (
        Object.prototype.hasOwnProperty.call(objeto, key) &&
        key !== 'Imagen' &&
        key !== 'Imagen2'
      ) {
        const field = objeto[key];
        if (typeof field === 'object') {
          if (this.buscarEnObjeto(field, valor)) {
            return true;
          }
        } else if (field.toString().toLowerCase().includes(valor.toLowerCase())) {
          return true;
        }
      }
    }
    return false;
  }


  filtrarTurnos(event: Event) {
    this.miTurno = null;
    this.verTurnos = true;
    if (event.target instanceof HTMLInputElement) {
      const valor = event.target.value;
        this.turnosFiltrados = this.turnos.filter(turno =>
          Object.values(turno).some(field =>
            typeof field === 'object'
              ? this.buscarEnObjeto(field, valor)
              : field.toString().toLowerCase().includes(valor.toLowerCase())
          )
        );
    }

  }

}
