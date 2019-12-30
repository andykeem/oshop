import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  title = 'oshop';
  user$: Observable<firebase.User>;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private userService: UserService) { }

  // Override
  ngOnInit(): void {
    this.user$ = this.authService.getAuthState();
    this.userSubscription = this.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);
      }
    });
  }

  // Override
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
