import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, empty, of } from 'rxjs';
import { AppUser } from '../model/app-user';
import { UserService } from './user.service';
import { switchMap, map } from 'rxjs/operators';
import { SnapshotAction } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authProvider;
  user$: Observable<firebase.User>;
  returnUrl: string;

  constructor(private ngFireAuth: AngularFireAuth, private userService: UserService) {
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

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap((authUser: firebase.User) => {
          if (authUser === null) {
            return of(null) as Observable<SnapshotAction<AppUser>>;
          }
          let appUserObs: Observable<AppUser> = this.userService.get(authUser.uid);
          return appUserObs;
        }),
        map((appUser: AppUser) => {
          if (appUser === null) {
            return null;
          }
          return appUser;
        }) 
      );
  }
}
