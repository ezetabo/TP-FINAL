import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormEspecialistaRoutingModule } from './form-especialista-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEspecialistaComponent } from './form-especialista.component';


@NgModule({
  declarations: [FormEspecialistaComponent],
  imports: [
    CommonModule,
    FormEspecialistaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FormEspecialistaModule { }
