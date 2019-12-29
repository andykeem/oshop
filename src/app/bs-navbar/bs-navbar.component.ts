import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  userName = 'Joe Smith';
  user$: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) { 
    
  }

  ngOnInit() {
    this.user$ = this.fireAuth.authState;
  }

  logout() {
    console.log('logout clicked..');
    this.fireAuth.auth.signOut();
  }
}
