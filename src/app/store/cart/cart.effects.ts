import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  AddProductToCart,
  RemoveProductFromCart,
  ChangeProductItemQty,
  ConfirmOrder } from './cart.actions';

import { Observable } from 'rxjs';
import { tap, pluck } from 'rxjs/operators';

import { ProductService } from 'src/app/shared/services';
import { ToastrMessage } from 'src/app/app.enum';
import { CartFacade } from './cart.facade';

function action$(observer, ...actions): Observable<any> {
  return observer.pipe(
    ofType(...actions),
    pluck('payload'),
  );
}

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    public cartFacade: CartFacade,
  ) { }

  @Effect({ dispatch: false })
  public addToLocalStorage$: Observable<any> = action$(this.actions$, AddProductToCart.TYPE,
    RemoveProductFromCart.TYPE, ChangeProductItemQty.TYPE, ConfirmOrder.TYPE)
      .pipe(
        tap(() => this.cartFacade.setCartItemsToLocalStorage())
      );

  @Effect({ dispatch: false })
  public navigateToCartPage$: Observable<any> = action$(this.actions$, AddProductToCart.TYPE)
    .pipe(
      tap(() => {
        this.cartFacade.onAddProduct();
      })
    );
}
