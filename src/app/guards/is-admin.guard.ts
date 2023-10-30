import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UsuarioDBService } from '../service/usuarioDB.service';


@Injectable({
  providedIn: 'root'
})

export class IsAdminGuard {
  constructor(private authService: AuthService,private uS :UsuarioDBService) {}

  canActivate: CanActivateFn = (): Observable<boolean> | boolean => {
    return new Observable<boolean>((observer) => {
      this.authService.getUserEmail().subscribe((mail) => {
        if (mail) {
          this.uS.getData().subscribe(col => {
            const user = col.find(u => u.Email === mail);
            observer.next(user!= undefined && user.EsAdmin);
            observer.complete();
          });
        } else {
          observer.next(false);
          observer.complete();
        }

      });
    });
  };
}






