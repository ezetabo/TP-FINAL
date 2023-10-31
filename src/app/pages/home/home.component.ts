import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { BuscadorService } from 'src/app/service/buscador.service';
import { UsuarioGral } from 'src/app/interface/usuario-gral.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  public ver: boolean = false;

  public usuario!: UsuarioGral;

  constructor(private auth: AuthService, private bsc: BuscadorService) { }


  ngOnInit(): void {
    this.auth.getUserEmail().subscribe(x => {
      this.bsc.byEmail(x!).subscribe(user => this.usuario = user as UsuarioGral)
    })
  }

  logout() {
    this.auth.logout();
  }

  verUser() {
    this.ver = !this.ver;
  }








}
