import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { IsAdminGuard } from 'src/app/guards/is-admin.guard';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  data: { animation: '* <=> *' },
    children: [
      {
        path: '',
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioModule),
        data: { animation: 'SeccionUsuariosPage' }
      },
      {
        path: 'seccion-usuarios',
        loadChildren: () => import('../seccion-usuarios/seccion-usuarios.module').then(m => m.SeccionUsuariosModule),
        canActivate: [IsAdminGuard]
      },
      {
        path: 'alta-usuarios',
        loadChildren: () => import('../registro/registro.module').then(m => m.RegistroModule),
        canActivate: [IsAdminGuard]
      },
      {
        path: 'cargar-horario',
        loadChildren: () => import('../horarios/horarios-especialista/horarios-especialista.module').then(m => m.HorariosEspecialistaModule),
        // canActivate: [IsAdminGuard]
      },
      {
        path: 'solicitar-turno',
        loadChildren: () => import('../horarios/horarios-turnos/horarios-turnos.module').then(m => m.HorariosTurnosModule),
        // canActivate: [IsAdminGuard]
      },
      {
        path: 'mis-turnos',
        loadChildren: () => import('../mis-turnos/mis-turnos.module').then(m => m.MisTurnosModule),
        // canActivate: [IsAdminGuard]
      },
      {
        path: 'mi-perfil',
        loadChildren: () => import('../mi-perfil/mi-perfil.module').then(m => m.MiPerfilModule),
        // canActivate: [IsAdminGuard]
      },
      {
        path: 'seccion-pacientes',
        loadChildren: () => import('../seccion-pacientes/seccion-pacientes.module').then(m => m.SeccionPacientesModule),
        // canActivate: [IsAdminGuard]
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
