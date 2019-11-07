import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AddProductToCart, RemoveProductFromCart,
  ChangeProductItemQty, ConfirmOrder } from '../actions/cart.actions';
import { ProductService } from 'src/app/shared/services';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) { }

  @Effect({ dispatch: false })
  public addToLocalStorage$: Observable<any> = this.actions$
    .pipe(
      ofType(
        AddProductToCart.TYPE, RemoveProductFromCart.TYPE,
        ChangeProductItemQty.TYPE, ConfirmOrder.TYPE
      ),
      tap(() => this.productService.setCartItemsToLocalStorage())
    );
}
