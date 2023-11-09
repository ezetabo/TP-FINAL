import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SpinnerModule } from 'src/app/modules/spinner/spinner.module';



@NgModule({
  declarations: [WelcomeComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    PipesModule,
    SpinnerModule
  ]
})
export class WelcomeModule { }
