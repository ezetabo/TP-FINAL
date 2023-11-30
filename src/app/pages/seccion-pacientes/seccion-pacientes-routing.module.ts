import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeccionPacientesComponent } from './seccion-pacientes.component';

const routes: Routes = [
  {
    path: '', component: SeccionPacientesComponent,
    data: { animation: '* <=> *' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionPacientesRoutingModule { }
