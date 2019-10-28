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

  public getProductWithError(): Observable<any> {
    const BAD_URL = 'https://od-api-demo.oxforddictionaries.com:443/api/v1/domains/en/en';

    return this.http.get<any>(BAD_URL);
  }
}
