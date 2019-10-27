import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { switchMap, map } from 'rxjs/operators';

import { ProductFormat } from 'src/app/app.enum';
import { LoadProducts, SetProducts } from '../actions/products.action';
import { ProductService } from '../../shared/services';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }

  @Effect()
  loadProducts$ = this.actions$
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
