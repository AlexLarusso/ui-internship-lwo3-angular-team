import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from '../../interfaces/product.interface';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpService: HttpService) { }

  public getProduct(id: string | number): Observable<IProduct> {
    return this.httpService.getData().pipe(map(products =>
      products.find(product => product.id === id)
    ));
  }
}
