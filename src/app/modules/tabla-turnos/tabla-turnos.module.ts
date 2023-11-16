import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaTurnosComponent } from './tabla-turnos.component';


@NgModule({
  declarations: [
    TablaTurnosComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [TablaTurnosComponent]
})
export class TablaTurnosModule { }
