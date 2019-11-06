import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from 'src/app/interfaces';

import { URLs } from '../../app.enum';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // private URL = '../assets/server-data/data.json';
  // private URLs.products = 'https://gaboo-project-server.herokuapp.com/products';
  // private URLs.images = 'https://gaboo-project-server.herokuapp.com/images';

  constructor(private http: HttpClient) { }

  public getData(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(URLs.products);
  }

  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${URLs.products}/${id}`);
  }

  public getProductsByCategory(category: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(URLs.products)
      .pipe(map(products => products.filter(product =>
        product.category === category
    )));
  }

  public getImages(): Observable<any> {
    return this.http.get<Array<any>>(URLs.images);
  }
}
