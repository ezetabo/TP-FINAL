import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeFLPipe } from './capitalize-fL.pipe';
import { OrdenarCronogramaPipe } from './ordenar-cronograma.pipe';
import { OrdenarEspecialistasPipe } from './ordenar-especialistas.pipe';
import { OrdenarListaStringPipe } from './ordenar-lista-string.pipe';
import { OrdenarUsuariosGralPipe } from './ordenar-usuarios-gral.pipe';



@NgModule({
  declarations: [
    CapitalizeFLPipe,
    OrdenarCronogramaPipe,
    OrdenarEspecialistasPipe,
    OrdenarListaStringPipe,
    OrdenarUsuariosGralPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CapitalizeFLPipe,
    OrdenarCronogramaPipe,
    OrdenarEspecialistasPipe,
    OrdenarListaStringPipe,
    OrdenarUsuariosGralPipe
  ]
})
export class PipesModule { }
