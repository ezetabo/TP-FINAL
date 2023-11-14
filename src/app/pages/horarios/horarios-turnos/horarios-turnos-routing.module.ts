import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosTurnosComponent } from './horarios-turnos.component';

const routes: Routes = [
  {
    path: '', component: HorariosTurnosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosTurnosRoutingModule { }
