import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> {
    return this.productService.getProduct(Number(route.paramMap.get('id')))
      .pipe(take(1));
  }
}
