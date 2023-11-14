import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeFLPipe } from './capitalizeFL.pipe';
import { OrdenarCronogramaPipe } from './ordenar-cronograma.pipe';
import { OrdenarEspecialistasPipe } from './ordenar-especialistas.pipe';



@NgModule({
  declarations: [CapitalizeFLPipe, OrdenarCronogramaPipe, OrdenarEspecialistasPipe],
  imports: [
    CommonModule
  ],
  exports:[
    CapitalizeFLPipe,
    OrdenarCronogramaPipe,
    OrdenarEspecialistasPipe
  ]
})
export class PipesModule { }
