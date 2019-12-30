import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authProvider;
  user$: Observable<firebase.User>;
  returnUrl: string;

  constructor(private ngFireAuth: AngularFireAuth) {
    this.user$ = ngFireAuth.authState;
    this.authProvider = new firebase.auth.GoogleAuthProvider();
  }

  getAuthProvider() {
    return this.authProvider;
  }

  setAuthProvider(provider) {
    this.authProvider = provider;
  }

  login() {
    this.ngFireAuth.auth.signInWithRedirect(this.authProvider);
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
