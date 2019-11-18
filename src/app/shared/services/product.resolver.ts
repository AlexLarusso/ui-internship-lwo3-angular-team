import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProductService } from 'src/app/shared/services';
import { IProduct } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<IProduct> {
  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
    return this.productService.getProductById(route.paramMap.get('id'))
      .pipe(take(1)) as Observable<IProduct>;
  }
}
