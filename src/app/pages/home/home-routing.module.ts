import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path:'',component: HomeComponent,
    children: [
      {
        path: 'registro',
        loadChildren: () => import('../registro/form-usuario/form-usuario.module').then(m => m.FormUsuarioModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
