import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  user$: Observable<firebase.User>;

  constructor(private auth: AuthService) { 
    
  }

  ngOnInit() {
    this.user$ = this.auth.getAuthState();
  }

  logout() {
    this.auth.logout();
  }
}
