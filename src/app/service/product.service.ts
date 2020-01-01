import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private ngFireDatabase: AngularFireDatabase) { }

  findAll(): Observable<Product[]> {
    return this.ngFireDatabase.list<Product>('products').valueChanges();
  }
}
