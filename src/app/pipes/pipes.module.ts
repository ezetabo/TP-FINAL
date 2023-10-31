import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapitalizeFirstLetterPipe } from './capitalize-first-letter.pipe';



@NgModule({
  declarations: [CapitalizeFirstLetterPipe],
  imports: [
    CommonModule
  ],
  exports:[
    CapitalizeFirstLetterPipe
  ]
})
export class PipesModule { }
