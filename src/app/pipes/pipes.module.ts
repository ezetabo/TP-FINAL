import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeFLPipe } from './capitalizeFL.pipe';



@NgModule({
  declarations: [CapitalizeFLPipe],
  imports: [
    CommonModule
  ],
  exports:[
    CapitalizeFLPipe
  ]
})
export class PipesModule { }
