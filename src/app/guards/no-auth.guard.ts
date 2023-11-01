import { Injectable } from '@angular/core';
import { CanActivateFn} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { IsAdminGuard } from './is-admin.guard';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard {
  constructor(private authService: AuthService) {}

  canActivate: CanActivateFn = (): Observable<boolean> | boolean => {
    return new Observable<boolean>((observer) => {
      this.authService.loggedIn().then((loggedIn) => {
        if (!loggedIn ||  IsAdminGuard) {
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
