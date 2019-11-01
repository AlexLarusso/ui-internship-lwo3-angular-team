import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private URL = '../assets/server-data/data.json';

  constructor(private http: HttpClient) { }

  public getData(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.URL);
  }

  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<Array<IProduct>>(this.URL)
      .pipe(map(products => products.find(product =>
        product.id === id
    )));
  }

  public getProductsByCategory(category: string): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.URL)
      .pipe(map(products => products.filter(product =>
        product.category === category
    )));
  }
}
