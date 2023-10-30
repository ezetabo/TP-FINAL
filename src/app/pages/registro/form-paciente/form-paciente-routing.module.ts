import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPacienteComponent } from './form-paciente.component';

const routes: Routes = [
  {
    path: '', component: FormPacienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormPacienteRoutingModule { }
