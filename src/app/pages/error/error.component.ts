import { Component} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  constructor(private auth: AuthService){}


  logout(){
    this.auth.logout();
  }
}
