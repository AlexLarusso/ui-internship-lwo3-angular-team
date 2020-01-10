import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { faSearch, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

import { Observable } from 'rxjs';

import { CartFacade } from 'src/app/store/cart/cart.facade';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainMenuComponent implements OnInit {
  public faSearch = faSearch;
  public faCartArrowDown = faCartArrowDown;
  public cartItemsQty$: Observable<number>;
  public menuItems = [
    {title: 'Shopping Cart', url: '/shopping-cart'},
    {title: 'Wish List', url: '/wishlist'},
    {title: 'My Account', url: '/myaccount'}
  ];
  public shopingCartLink = this.menuItems[0].url;

  constructor(public cartFacade: CartFacade) { }

  public ngOnInit(): void {
    this.cartItemsQty$ = this.cartFacade.cartItemsQty$;
  }
}
