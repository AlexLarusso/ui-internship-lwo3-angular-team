import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Effect, Actions, ofType } from '@ngrx/effects';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AddProductToCart, RemoveProductFromCart,
  ChangeProductItemQty, ConfirmOrder } from '../actions/cart.actions';
import { ProductService } from 'src/app/shared/services';
import { ToastrMessage } from 'src/app/app.enum';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private toastrService: ToastrService
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
      tap((prod) => {
        const buyMessage = ToastrMessage.productAddedToCart;

        this.toastrService.success(buyMessage);
      })
    );
}
