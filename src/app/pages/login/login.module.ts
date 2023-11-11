import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        PipesModule
    ]
})
export class LoginModule { }
