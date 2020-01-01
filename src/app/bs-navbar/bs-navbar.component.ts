import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { AppUser } from '../model/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  shopName: string = 'oshop';
  appUser: AppUser;
  userSubscr: Subscription;

  constructor(private auth: AuthService) { }

  // Override
  ngOnInit() {
    this.userSubscr = this.auth.appUser$
      .subscribe(appUser => {
        this.appUser = appUser;
      });
  }

  // Override
  ngOnDestroy(): void {
    this.userSubscr.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
