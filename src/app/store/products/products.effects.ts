import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { LoadProducts } from './products.action';

import { switchMap } from 'rxjs/operators';

import { ProductsFacade } from './products.facade';

@Injectable()
export class ProductsEffects {

  constructor(
    private actions$: Actions,
    public productsFacade: ProductsFacade
  ) {
  }

  @Effect()
  public loadProducts$ = this.actions$
  .pipe(
    ofType(LoadProducts.TYPE),
    switchMap(() =>
      this.productsFacade.onSetProducts()
    )
  );
}
