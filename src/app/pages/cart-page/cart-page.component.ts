import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription, combineLatest } from 'rxjs';

import {
  getProductQuantity, getProductSelectedColor, getProductSelectedSize
} from 'src/app/store/selectors/product-options.selector';

import { IProductCartItem } from 'src/app/interfaces';
import { IAppState } from 'src/app/store/app.store';
import { map } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.html'
})
export class CartPageComponent implements OnInit, OnDestroy {

  public productsList: Array<IProductCartItem> = [];

  public selectedOptionsSub: Subscription;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    console.log('im alive');

    const selectedOptionsSub = combineLatest(
      this.store.select(getProductQuantity),
      this.store.select(getProductSelectedSize),
      this.store.select(getProductSelectedColor),
      ).pipe(
          map(([qty, size, color]) => ({ qty, size, color })
        )
      ).subscribe(console.log);
    }

  public ngOnDestroy(): void { }
}
