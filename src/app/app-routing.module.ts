import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from './guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'welcome',
    loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'registro-pacientes',
    loadChildren: () => import('./pages/registro/form-paciente/form-paciente.module').then(m => m.FormPacienteModule),
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'registro-especialistas',
    loadChildren: () => import('./pages/registro/form-especialista/form-especialista.module').then(m => m.FormEspecialistaModule),
    // canActivate: [NoAuthGuard]
  },
  {
    path: 'registro-usuarios',
    loadChildren: () => import('./pages/registro/form-usuario/form-usuario.module').then(m => m.FormUsuarioModule),
    // canActivate: [NoAuthGuard]
  }
  // {
  //     path: '',
  //     loadChildren: () => import('./pages/registro/form-especialista/form-especialista.module').then(m => m.FormEspecialistaModule),
  //   // canActivate: [NoAuthGuard]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
