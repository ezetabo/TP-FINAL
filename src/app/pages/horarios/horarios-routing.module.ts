import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorariosComponent } from './horarios.component';

const routes: Routes = [
  {
    path:'', component: HorariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorariosRoutingModule { }
