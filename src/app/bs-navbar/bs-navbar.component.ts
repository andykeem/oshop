import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { UserService } from '../service/user.service';
import { SnapshotAction } from 'angularfire2/database';
import { AppUser } from '../model/app-user';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit, OnDestroy {

  user$: Observable<firebase.User>;
  userSubscription: Subscription;
  isAdmin: boolean;

  constructor(private auth: AuthService, private user: UserService) { }

  // Override
  ngOnInit() {
    this.user$ = this.auth.getAuthState();
    this.userSubscription = this.user$
      .pipe(
        switchMap(user => {
          let snapshot: Observable<SnapshotAction<AppUser>> = this.user.get(user.uid);
          return snapshot;
        })
      ).subscribe(snapshot => {
        let appUser: AppUser = snapshot.payload.val() as AppUser;
        this.isAdmin = appUser.isAdmin;
      });
  }

  // Override
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
}
