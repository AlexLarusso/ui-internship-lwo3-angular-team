import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { switchMap, map, tap } from 'rxjs/operators';

import { ProductFormat } from 'src/app/app.enum';
import { LoadProducts, SetProducts, SetProductImages } from '../actions/products.action';
import { ProductService, HttpService } from '../../shared/services';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private httpService: HttpService
  ) { }

  @Effect()
  public loadProductImages$ = this.actions$
  .pipe(
    ofType(LoadProducts.TYPE),
    switchMap(() =>
      this.httpService.getImages()
        .pipe(
          tap(data => console.log(data)),
          map(images => new SetProductImages(images))
        )
    )
  );

  @Effect()
  public loadProducts$ = this.actions$
  .pipe(
    ofType(LoadProducts.TYPE),
    switchMap(() =>
      this.productService.getProducts(ProductFormat.short)
        .pipe(
          map(products => new SetProducts(products))
        )
    )
  );
}
