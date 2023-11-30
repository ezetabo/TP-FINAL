import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./pages/error/error-page.module').then(m => m.ErrorPageModule),
  },






  // {
  //   path: '', component: FormHistoriaClinicaComponent
  // }
  // {
  //   path:'', loadChildren: () => import('./pages/seccion-pacientes/seccion-pacientes.module').then(m => m.SeccionPacientesModule),
  // }

  // {
  //   path:'', loadChildren: () => import('./pages/subir-fotos/fotos.module').then(m => m.FotosModule),
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
