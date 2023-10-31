import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { Observable, from, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  async registerUser(email: string, password: string): Promise<any> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        res.user?.sendEmailVerification();
        return res.user
      })
      .catch(() => { return false });
  }

  async login(email: string, password: string): Promise<any> {
    return await this.afAuth.signInWithEmailAndPassword(email, password)
      .catch(() => { return false });
  }

  async loggedIn(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const user = await this.afAuth.currentUser;
      if (user && user.emailVerified) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }


  async logout(): Promise<void> {
    return this.afAuth.signOut()
      .then(() => {
        this.router.navigate(['']);
      })
      .catch((error) => {
        console.error('Error al desloguear:', error);
      });
  }


  getUserEmail(): Observable<string | null> {
    return from(this.afAuth.currentUser).pipe(
      map((user) => {
        return user ? user.email : null;
      })
    );
  }


}



