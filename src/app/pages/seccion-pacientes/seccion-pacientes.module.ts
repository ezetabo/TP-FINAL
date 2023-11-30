import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionPacientesRoutingModule } from './seccion-pacientes-routing.module';
import { SeccionPacientesComponent } from './seccion-pacientes.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SeccionPacientesComponent],
  imports: [
    CommonModule,
    SeccionPacientesRoutingModule,
    PipesModule,
    FormsModule
  ]
})
export class SeccionPacientesModule { }
