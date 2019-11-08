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

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(URLs.products);
  }

  public getProductById(id: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${URLs.products}/${id}`);
  }

  public getImages(): Observable<any> {
    return this.http.get<Array<any>>(URLs.images);
  }
}
