import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  user$: Observable<firebase.User>;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.user$ = this.auth.getAuthState();
  }

  logout() {
    this.auth.logout();
  }

  // navigateToLogin() {
  //   let navExtras: NavigationExtras = {
  //     queryParams: { returnUrl: this.router.url },
  //     queryParamsHandling: 'merge'
  //   }
  //   this.router.navigate(['/login'], navExtras);
  // }
}
