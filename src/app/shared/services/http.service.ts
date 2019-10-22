import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../interfaces/product.interface';
import { Observable } from 'rxjs';
import { pipe, map } from 'rxjs/operators';

@Injectable()
export class HttpService {
  private URL = '../assets/server-data/data.json';

  constructor(private http: HttpClient) { }

  public getData(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.URL);
  }

  public getProductById(id): Observable<IProduct> {
    return this.http.get<Array<IProduct>>(this.URL)
      .pipe(map(products => products.find(product =>
        product.id == id
    )));
  }

  public getProductsByCategory(category: string): Observable<IProduct> {
    return this.http.get<Array<IProduct>>(this.URL)
      .pipe(map(products => products.filter(products =>
        product.category == category
    )));
  }
}
