import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeFLPipe } from './capitalize-fL.pipe';
import { OrdenarCronogramaPipe } from './ordenar-cronograma.pipe';
import { OrdenarEspecialistasPipe } from './ordenar-especialistas.pipe';
import { OrdenarListaStringPipe } from './ordenar-lista-string.pipe';
import { OrdenarUsuariosGralPipe } from './ordenar-usuarios-gral.pipe';
import { OrdenarMedicosPipe } from './ordenar-medicos.pipe';
import { ImagenEspGenericaPipe } from './imagen-esp-generica.pipe';
import { FechaFormatPipe } from './fecha-format.pipe';
import { HoraFormatPipe } from './hora-format.pipe';
import { OrdenarStringsPipe } from './ordenar-strings.pipe';
import { OrdenarTurnosPipe } from './ordenar-turnos.pipe';
import { FiltrarUnicoTurnoPipe } from './filtrar-unico-turno.pipe';



@NgModule({
  declarations: [
    CapitalizeFLPipe,
    OrdenarCronogramaPipe,
    OrdenarEspecialistasPipe,
    OrdenarListaStringPipe,
    OrdenarUsuariosGralPipe,
    OrdenarMedicosPipe,
    ImagenEspGenericaPipe,
    FechaFormatPipe,
    HoraFormatPipe,
    OrdenarStringsPipe,
    OrdenarTurnosPipe,
    FiltrarUnicoTurnoPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CapitalizeFLPipe,
    OrdenarCronogramaPipe,
    OrdenarEspecialistasPipe,
    OrdenarListaStringPipe,
    OrdenarUsuariosGralPipe,
    OrdenarMedicosPipe,
    ImagenEspGenericaPipe,
    FechaFormatPipe,
    HoraFormatPipe,
    OrdenarStringsPipe,
    OrdenarTurnosPipe,
    FiltrarUnicoTurnoPipe,
  ]
})
export class PipesModule { }
