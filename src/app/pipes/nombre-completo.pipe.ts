import { Pipe, PipeTransform } from '@angular/core';
import { Especialista, Paciente, UsuarioGral } from '../interface/usuario-gral.interface';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {
  transform(usuario: UsuarioGral | Paciente | Especialista): string {
    if (usuario && usuario.Nombre && usuario.Apellido) {
      const nombreCompleto = `${usuario.Apellido} ${usuario.Nombre}`;
      return this.capitalizarPalabras(nombreCompleto);
    }
    return '';
  }

  private capitalizarPalabras(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
