import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, switchMap, filter } from 'rxjs/operators';
import { UserService } from './user.service';
import { AppUser } from '../model/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private user: UserService) { }

  // Override
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.getAuthState()
      .pipe(
        switchMap(authUser => {
          return this.user.get(authUser.uid);
        }),
        map(item => {
          let appUser: AppUser = item.payload.val() as AppUser;
          return appUser.isAdmin;
        })
      );
  }
  
}
