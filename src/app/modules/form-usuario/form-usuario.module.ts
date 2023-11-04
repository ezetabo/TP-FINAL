import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUsuarioComponent } from './form-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [FormUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports:[
    FormUsuarioComponent
  ]
})
export class FormUsuarioModule { }
