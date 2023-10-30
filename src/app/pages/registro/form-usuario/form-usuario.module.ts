import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormUsuarioRoutingModule } from './form-usuario-routing.module';
import { FormUsuarioComponent } from './form-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormUsuarioRoutingModule,
    ReactiveFormsModule
  ]
})
export class FormUsuarioModule { }
