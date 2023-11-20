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
    HoraFormatPipe
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
    HoraFormatPipe
  ]
})
export class PipesModule { }
