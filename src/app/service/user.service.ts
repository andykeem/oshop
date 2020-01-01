import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, AngularFireList, SnapshotAction } from 'angularfire2/database';
import { AppUser } from '../model/app-user';
import { Observable, empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    this.db.object('users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  get(uid: string): Observable<AppUser> {
    // this.db.object<AppUser>('/users/' + uid).snapshotChanges()
    //   .subscribe(item => {
    //     let appUser: AppUser = (item.payload.toJSON() as AppUser);
    //     return appUser;
    //   });
    // return null;
    
    return this.db.object<AppUser>('users/' + uid).valueChanges();
  }
}