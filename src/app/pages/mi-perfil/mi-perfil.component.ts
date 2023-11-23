import { Component, OnInit } from '@angular/core';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';
import { MensajeroService } from 'src/app/service/mensajero.service';
import { Paciente } from '../../interface/usuario-gral.interface';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  public historia: boolean = false;
  public ver: boolean = false;
  public paciente: Paciente | null = null;
  public usuario: UsuarioGral = {
    id: 'lSsjyfvFWMBdRmKknZMq',
    Nombre: 'Samara',
    Apellido: 'Saldara',
    Edad: 22,
    Dni: '49123123',
    Email: 'fidisap580@eazenity.com',
    Password: '',
    Imagen: 'https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/users%2F_1699659329081?alt=media&token=bc666d3e-3957-49a1-a638-1f57ca59a5bb',
    Rol: 'especialista',
    Especialidades: ['Alergologia',
      'Anestesiologia',
      'Angiologia',
      'Cardiologia',
      'Endocrinologia',
      'Estomatologia',
      'Farmacologia Clinica',
      'Gastroenterologia',
      'Genetica',
      'Geriatria',
      'Hematologia',
      'Hepatologia',
      'Infectologia',
      'Medicina del deporte',
      'Medicina familiar y comunitaria',
      'Medicina fisica y rehabilitación',
      'Medicina intensiva',
      'Nefrologia',
      'Neumologia',
      'Neurologia',
      'Nutriologia',
      'Oncologia medica',
      'Oncologia radioterapica',
      'Pediatria',
      'Psiquiatria',
      'Reumatologia',
      'Toxicologia'],
    Autorizado: true,
    Imagen2: 'https://firebasestorage.googleapis.com/v0/b/tp-final-taboada2023.appspot.com/o/users%2F_1699660397298?alt=media&token=5dbfc482-b8f2-420a-bec6-f717cce3c503',
    ObraSocial: 'ELEVAR',
  }

  constructor(private mnsj: MensajeroService) { }

  ngOnInit(): void {
    this.usuario = this.mnsj.getCurrentUser();
    if (this.usuario.Rol == 'paciente') {
      this.paciente = {
        id: this.usuario.id,
        Nombre: this.usuario.Nombre,
        Apellido: this.usuario.Apellido,
        Edad: this.usuario.Edad,
        Imagen: this.usuario.Imagen,
        Imagen2: this.usuario.Imagen2,
        Email: this.usuario.Email,
        ObraSocial: this.usuario.ObraSocial
      }
    }
    setTimeout(() => {
      this.ver = true;
    }, 500);
  }

  verHistoria() {
    this.historia = !this.historia;
  }
}
