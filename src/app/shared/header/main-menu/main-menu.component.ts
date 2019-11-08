import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import {
  faSearch, faCartArrowDown
} from '@fortawesome/free-solid-svg-icons';

import { IAppState } from 'src/app/store/app.store';
import { getCartTotalQty } from 'src/app/store/selectors/cart.selector';



@AutoUnsubscribe()
@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {
  public faSearch = faSearch;
  public faCartArrowDown = faCartArrowDown;
  public cartItemsQtySub: Subscription;
  public cartItemsQty = 0;

  constructor(private store: Store<IAppState>) { }

  public menuItems = [
    {title: 'Shopping Cart', url: '/shoppingcart'},
    {title: 'Wish List', url: '/wishlist'},
    {title: 'Checkout', url: '/checkout'},
    {title: 'My Account', url: '/myaccount'}
  ];


  public ngOnInit(): void {
    this.cartItemsQtySub = this.store.select(getCartTotalQty)
      .subscribe(qty => this.cartItemsQty = qty);
  }

  public ngOnDestroy(): void { }
}
