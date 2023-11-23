import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SpinnerModule } from 'src/app/modules/spinner/spinner.module';
import { FormHistoriaClinicaModule } from 'src/app/modules/form-historia-clinica/form-historia-clinica.module';


@NgModule({
  declarations: [MiPerfilComponent],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    PipesModule,
    SpinnerModule,
    FormHistoriaClinicaModule,
  ]
})
export class MiPerfilModule { }
