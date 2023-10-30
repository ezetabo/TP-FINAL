import { Injectable } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate: CanActivateFn = (): Observable<boolean> | boolean => {
    return new Observable<boolean>((observer) => {
      this.authService.loggedIn().then((loggedIn) => {
        if (loggedIn) {
          observer.next(true);
          observer.complete();
        } else {
          observer.next(false);
          observer.complete();
        }
      });
    });
  };
}






