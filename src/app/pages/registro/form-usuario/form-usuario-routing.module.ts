import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUsuarioComponent } from './form-usuario.component';

const routes: Routes = [
  {
    path:'',component: FormUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormUsuarioRoutingModule { }
