import { Lista } from "./listas.interface";

export interface UsuarioGral {
  id: string;
  Nombre: string;
  Apellido: string;
  Edad: number;
  Dni: string;
  Email: string;
  Password: string;
  Imagen: string;
  Rol: string;
  Especialidades: Lista[];
  Autorizado: boolean;
  Imagen2: string;
  ObraSocial: string;

}
