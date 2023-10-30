import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPacienteRoutingModule } from './form-paciente-routing.module'
import { ReactiveFormsModule } from '@angular/forms';
import { FormPacienteComponent } from './form-paciente.component';


@NgModule({
  declarations: [FormPacienteComponent],
  imports: [
    CommonModule,
    FormPacienteRoutingModule,
    ReactiveFormsModule,
  ]
})
export class FormPacienteModule { }
