import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from './product';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpService: HttpService) { }

  public getProduct(id: number): Observable<IProduct> {
    return this.httpService.getData().pipe(map(products => products[id - 1]));
  }
}
