import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  faSearch, faCartArrowDown
} from '@fortawesome/free-solid-svg-icons';

import { IAppState } from 'src/app/store/app.store';
import { getCartTotalQty } from 'src/app/store/selectors/cart.selector';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.scss']
})
export class MainMenuComponent implements OnInit {
  public faSearch = faSearch;
  public faCartArrowDown = faCartArrowDown;
  public cartItemsQty$: Observable<number>;

  constructor(private store: Store<IAppState>) { }

  public menuItems = [
    {title: 'Shopping Cart', url: '/shopping-cart'},
    {title: 'Wish List', url: '/wishlist'},
    {title: 'My Account', url: '/myaccount'}
  ];

  public ngOnInit(): void {
    this.cartItemsQty$ = this.store.select(getCartTotalQty);
  }
}
