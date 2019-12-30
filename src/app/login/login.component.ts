import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  userSubscription: Subscription;

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.userSubscription = this.auth.getAuthState().subscribe(user => {
      if (user) {
        this.navigateToReturnUrl();
      }
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  navigateToReturnUrl() {
    this.route.queryParams.subscribe(params => {
      if (params.returnUrl) {
        this.router.navigate([params.returnUrl]);
      }
    });
  }

  login() {
    this.auth.login();
  }
}
