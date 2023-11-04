import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotosComponent } from './fotos.component';

const routes: Routes = [
  {
    path:'', component: FotosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FotosRoutingModule { }
