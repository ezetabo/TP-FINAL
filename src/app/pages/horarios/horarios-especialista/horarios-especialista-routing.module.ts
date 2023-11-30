import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosEspecialistaComponent } from './horarios-especialista.component';

const routes: Routes = [
  {
    path:'', component: HorariosEspecialistaComponent,
    data: { animation: '* <=> *' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
