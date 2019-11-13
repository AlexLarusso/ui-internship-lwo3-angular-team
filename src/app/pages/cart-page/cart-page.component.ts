import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  getCartProductItems, getCartTotalPrice
} from 'src/app/store/selectors/cart.selector';

import { IProductCartItem } from 'src/app/interfaces';
import { IAppState } from 'src/app/store/app.store';
import { ConfirmOrder } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.scss']
})
export class CartPageComponent implements OnInit {
  public emptyCartUrl = './assets/img/empty-cart.gif';
  public isPopularListVisible = false;
  public productOptions = ['Product', 'Details', 'Quantity', 'Price', 'Sum'];
  public currentCurrency = 'USD';
  public cartProductList$: Observable<Array<IProductCartItem>>;
  public cartTotalPrice$: Observable<number>;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.cartProductList$ = this.store.select(getCartProductItems);
    this.cartTotalPrice$ = this.store.select(getCartTotalPrice);
  }

  public displayPopularList(): void {
    this.isPopularListVisible = true;
  }

  public confirmOrder(): void {
    this.store.dispatch(new ConfirmOrder());
  }
}
