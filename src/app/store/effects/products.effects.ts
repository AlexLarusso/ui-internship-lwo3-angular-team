import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadProducts, SetProducts, SetProductImages } from '../actions/products.action';

import { switchMap, map } from 'rxjs/operators';

import { HttpService } from '../../shared/services';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    private httpService: HttpService
  ) {
  }

  @Effect()
  public loadProducts$ = this.actions$
  .pipe(
    ofType(LoadProducts.TYPE),
    switchMap(() =>
      this.httpService.getAllProducts()
        .pipe(
          map(products => new SetProducts(products))
        )
    )
  );
}
