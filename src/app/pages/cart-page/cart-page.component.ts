import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription, combineLatest } from 'rxjs';

import {
  getCartProductItems
} from 'src/app/store/selectors/cart.selector';

import { IProductCartItem } from 'src/app/interfaces';
import { IAppState } from 'src/app/store/app.store';
import { map } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.scss']
})
export class CartPageComponent implements OnInit, OnDestroy {

  public cartProductList: Array<IProductCartItem> = [];

  public cartProductListSub: Subscription;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.cartProductListSub 
      this.store.select(getCartProductItems)
        .subscribe(items => {
          console.log(items);
          this.cartProductList = items
        });
    }

  public ngOnDestroy(): void { }
}
