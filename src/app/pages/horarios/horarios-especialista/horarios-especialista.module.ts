import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-especialista-routing.module';
import { HorariosEspecialistaComponent } from './horarios-especialista.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HorariosEspecialistaComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    FormsModule,
    PipesModule
  ]
})
export class HorariosEspecialistaModule { }
