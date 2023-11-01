import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablaComponent } from './tabla.component';



@NgModule({
  declarations: [TablaComponent],
  imports: [
    CommonModule
  ],
  exports:[TablaComponent]
})
export class TablaModule { }
