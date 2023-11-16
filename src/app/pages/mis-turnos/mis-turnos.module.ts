import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisTurnosRoutingModule } from './mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos.component';
import { TablaTurnosModule } from 'src/app/modules/tabla-turnos/tabla-turnos.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    MisTurnosRoutingModule,
    TablaTurnosModule,
    PipesModule
  ]
})
export class MisTurnosModule { }
