import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FotosRoutingModule } from './fotos-routing.module';
import { FotosComponent } from './fotos.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FotosComponent],
  imports: [
    CommonModule,
    FotosRoutingModule,
    ReactiveFormsModule
  ]
})
export class FotosModule { }
