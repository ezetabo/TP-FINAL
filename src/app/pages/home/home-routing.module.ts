import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { IsAdminGuard } from 'src/app/guards/is-admin.guard';

const routes: Routes = [
  {
    path:'',component: HomeComponent,
    children: [
      {
        path: 'seccion-usuarios',
        loadChildren: () => import('../seccion-usuarios/seccion-usuarios.module').then(m => m.SeccionUsuariosModule),
        canActivate:[IsAdminGuard]
      },
      {
        path: 'alta-usuarios',
        loadChildren: () => import('../registro/registro.module').then(m => m.RegistroModule),
        canActivate:[IsAdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
