import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { TablaComponent } from 'src/app/components/tabla/tabla.component';



@NgModule({
  declarations: [TablaComponent,],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
  ]
})
export class WelcomeModule { }
