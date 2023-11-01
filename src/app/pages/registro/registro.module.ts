import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistroRoutingModule } from './registro-routing.module';
import { RegistroComponent } from './registro.component';
import { FormUsuarioModule } from 'src/app/modules/form-usuario/form-usuario.module';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    RegistroRoutingModule,
    FormUsuarioModule
  ]
})
export class RegistroModule { }
