import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

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
    private productService: ProductService,
    private router: Router
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

  @Effect({ dispatch: false })
  public navigateToCartPage$: Observable<any> = this.actions$
    .pipe(
      ofType(AddProductToCart.TYPE),
      tap(() => this.router.navigate(['/shoppingcart']))
    );
}
