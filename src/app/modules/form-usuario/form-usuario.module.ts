import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormUsuarioComponent } from './form-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [FormUsuarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PipesModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  exports:[
    FormUsuarioComponent
  ]
})
export class FormUsuarioModule { }
