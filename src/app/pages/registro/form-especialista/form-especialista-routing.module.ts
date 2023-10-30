import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEspecialistaComponent } from './form-especialista.component';

const routes: Routes = [
  { path: '',component: FormEspecialistaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormEspecialistaRoutingModule { }
