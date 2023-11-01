import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUsuarioComponent } from './form-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    FormUsuarioComponent
  ]
})
export class FormUsuarioModule { }
