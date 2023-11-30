import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsUsuariosComponent } from './cards-usuarios.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [CardsUsuariosComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports: [CardsUsuariosComponent]
})
export class CardsUsuariosModule { }
