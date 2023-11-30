import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeccionUsuariosRoutingModule } from './seccion-usuarios-routing.module';
import { SeccionUsuariosComponent } from './seccion-usuarios.component';
import { TablaModule } from 'src/app/modules/tabla/tabla.module';
import { CardsUsuariosModule } from '../../modules/cards-usuarios/cards-usuarios.module';


@NgModule({
  declarations: [
    SeccionUsuariosComponent
  ],
  imports: [
    CommonModule,
    SeccionUsuariosRoutingModule,
    TablaModule,
    CardsUsuariosModule
  ]
})
export class SeccionUsuariosModule { }
