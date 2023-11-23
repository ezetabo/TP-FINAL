import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormHistoriaClinicaComponent } from './form-historia-clinica.component';



@NgModule({
  declarations: [FormHistoriaClinicaComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
  ],
  exports:[
    FormHistoriaClinicaComponent
  ]
})
export class FormHistoriaClinicaModule {}
