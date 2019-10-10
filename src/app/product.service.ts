import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IProductShortInfo } from './product-short-info';
import { IProduct } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productData: Array<IProductShortInfo>;
  endpoint = 0;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
   private http: HttpClient) { }

  public getProduct(id: number): Observable<IProduct> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<IProduct>(url);
  }

  private productsUrl = 'api/products';

}
