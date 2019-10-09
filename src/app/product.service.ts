import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductShortInfo } from './product-short-info';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productData: Array<IProductShortInfo>;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private httpService: HttpService, 
      private http: HttpClient) { }

  public getShortInfo(): Observable<Array<IProductShortInfo>> {
    return this.httpService
      .getData()
      .pipe(map(data =>
        data.map((item => ({
          title: item.productName,
          imgUrl: item.images[0].url[0],
          price: item.price + ' uah',
        })
      ))));
  }

  public getProduct(id: number): Observable<IProduct> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url);
  }

  private productsUrl = 'api/products';

}
