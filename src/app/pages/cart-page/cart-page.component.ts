import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import {
  getCartProductItems, getCartTotalPrice
} from 'src/app/store/selectors/cart.selector';

import { IProductCartItem } from 'src/app/interfaces';
import { IAppState } from 'src/app/store/app.store';

@AutoUnsubscribe()
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {

  public cartProductList: Array<IProductCartItem> = [];
  public totalPrice = 0;
  public emptyCartUrl = './assets/server-data/images/empty-cart.gif';
  public isPopularListVisible = false;
  public productOptions = ['Product', 'Details', 'Quantity', 'Price', 'Summary'];
  public cartProductListSub: Subscription;
  public cartTotalPriceSub: Subscription;
  public currentCurrency = 'UAH';

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.cartProductListSub = this.store.select(getCartProductItems)
      .subscribe(items => this.cartProductList = items);
    this.cartTotalPriceSub = this.store.select(getCartTotalPrice)
      .subscribe(price => this.totalPrice = price)
    }

  public ngOnDestroy(): void { }

  public displayPopularList(): void {
    this.isPopularListVisible = true;
  }
}
