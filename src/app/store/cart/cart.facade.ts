import { Injectable, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ToastrService } from 'ngx-toastr';

import { Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import {
  RemoveProductFromCart,
  ChangeProductItemQty,
  ConfirmOrder
} from './cart.actions';
import {
  getCartProductItems,
  getCartTotalPrice,
  getCartTotalQty
} from 'src/app/store/cart/cart.selector';


import { Subscription } from 'rxjs';

import { ToastrMessage } from 'src/app/app.enum';

@AutoUnsubscribe()
@Injectable({
  providedIn: 'root'
})
export class CartFacade implements OnDestroy {
  public cartProductList$ = this.store.select(getCartProductItems);
  public cartTotalPrice$ = this.store.select(getCartTotalPrice);
  public cartItemsQty$ = this.store.select(getCartTotalQty);
  public localStorageSub: Subscription;

  private CART_KEY = 'Cart';

  constructor(
    private store: Store<IAppState>,
    private toastrService: ToastrService) {}

  public removeItemFromCart(productItem): void {
    this.store.dispatch(new RemoveProductFromCart(productItem));
  }

  public handleQtyChange(payload): void {
    this.store.dispatch(new ChangeProductItemQty(payload));
  }

  public confirmOrder(): void {
    this.store.dispatch(new ConfirmOrder());
  }

  public setCartItemsToLocalStorage(): void {
    this.localStorageSub = this.cartProductList$
      .subscribe(products =>
        localStorage.setItem(this.CART_KEY, JSON.stringify(products))
      );
  }

  public onAddProduct(): void {
    const buyMessage = ToastrMessage.productAddedToCart;

    this.toastrService.success(buyMessage);
  }

  public ngOnDestroy(): void { }
}
