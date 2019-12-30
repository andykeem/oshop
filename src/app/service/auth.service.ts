import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<firebase.User>;
  returnUrl: string;

  constructor(private ngFireAuth: AngularFireAuth,
              private googleAuth: firebase.auth.GoogleAuthProvider) {
    this.user$ = ngFireAuth.authState;
  }

  login() {
    this.ngFireAuth.auth.signInWithRedirect(this.googleAuth);
  }

  getAuthState(): Observable<firebase.User> {
    return this.user$;
  }

  logout() {
    this.ngFireAuth.auth.signOut();
  }

  getReturnUrl() {
    return this.returnUrl;
  }

  setReturnUrl(url: string) {
    this.returnUrl = url;
  }
}
