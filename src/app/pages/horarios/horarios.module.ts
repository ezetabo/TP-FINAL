import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorariosRoutingModule } from './horarios-routing.module';
import { HorariosComponent } from './horarios.component';


@NgModule({
  declarations: [
    HorariosComponent
  ],
  imports: [
    CommonModule,
    HorariosRoutingModule
  ]
})
export class HorariosModule { }
