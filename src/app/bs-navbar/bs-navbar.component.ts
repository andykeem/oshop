import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  userName = 'Joe Smith';
  user: firebase.User;

  constructor(private fireAuth: AngularFireAuth) { 
    
  }

  ngOnInit() {
    this.fireAuth.authState.subscribe(user => {
      console.log('auth user: ', user);
      this.user = user;
    });
  }

  logout() {
    console.log('logout clicked..');
    this.fireAuth.auth.signOut();
  }
}
