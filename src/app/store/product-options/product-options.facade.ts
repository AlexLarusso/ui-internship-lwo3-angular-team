import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.store';
import { AddProductToCart } from 'src/app/store/cart/cart.actions';
import {
  SelectColor, ResetProductOptions, IncrementQuantity, DecrementQuantity, SelectSize
} from 'src/app/store/product-options/product-options.actions';
import {
  getProductQuantity, getProductSelectedColor, getProductSelectedSize
} from 'src/app/store/product-options/product-options.selector';

@Injectable({
  providedIn: 'root'
})
export class ProductOptionsFacade {
  public productQuantity$ = this.store.select(getProductQuantity);
  public productSelectedColor$ = this.store.select(getProductSelectedColor);
  public productSelectedSize$ = this.store.select(getProductSelectedSize);
  public productMedia$ = this.store.select(getProductSelectedColor);

  constructor(private store: Store<IAppState>) { }

  public onSelectColor(payload): void {
    this.store.dispatch(new SelectColor(payload));
  }

  public onAddProduct(payload): void {
    this.store.dispatch(new AddProductToCart(payload));
  }

  public onIncrementQuantity(): void {
    this.store.dispatch(new IncrementQuantity());
  }

  public onDecrementQuantity(): void {
    this.store.dispatch(new DecrementQuantity());
  }

  public onResetProducts(): void {
    this.store.dispatch(new ResetProductOptions());
  }

  public onSelectSize(payload): void {
    this.store.dispatch(new SelectSize(payload));
  }
}
