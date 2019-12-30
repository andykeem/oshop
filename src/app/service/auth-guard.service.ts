import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const returnUrl = state.url;
    return this.auth.getAuthState()
      .pipe(
        map(user => {
          if (user != null) {
            return true;
          }
          this.auth.setReturnUrl(returnUrl);
          this.router.navigate(['/login'], { queryParams: { returnUrl: returnUrl } });
          return false;
        })
      );
  }
}
