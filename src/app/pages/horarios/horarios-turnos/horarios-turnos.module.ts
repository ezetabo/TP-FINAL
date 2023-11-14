import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosTurnosRoutingModule } from './horarios-turnos-routing.module';
import { HorariosTurnosComponent } from './horarios-turnos.component';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  declarations: [
    HorariosTurnosComponent
  ],
  imports: [
    CommonModule,
    HorariosTurnosRoutingModule,
    PipesModule
  ]
})
export class HorariosTurnosModule { }
