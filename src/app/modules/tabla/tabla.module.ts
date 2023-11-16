import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla.component';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [TablaComponent],
  imports: [
    CommonModule,
    PipesModule
  ],
  exports:[TablaComponent]
})
export class TablaModule { }
