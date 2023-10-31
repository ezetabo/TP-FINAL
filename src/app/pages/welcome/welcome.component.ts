import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  constructor(private rtr:Router, private auth: AuthService){}

  navegar(url: string): void {
    this.rtr.navigateByUrl(url)
  }

  logout() {
    this.auth.logout();
  }
}
