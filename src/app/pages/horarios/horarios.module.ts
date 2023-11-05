import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { HorariosComponent } from './horarios.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HorariosComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule,
    FormsModule,
    PipesModule
  ]
})
export class HorariosModule { }
