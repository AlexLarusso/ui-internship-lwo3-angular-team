import { Component } from '@angular/core';

import {
  faSearch, faCartArrowDown
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.html',
  styleUrls: ['./main-menu.scss']
})
export class MainMenuComponent {
  public faSearch = faSearch;
  public faCartArrowDown = faCartArrowDown;

  public menuItems = [
    {title: 'Shopping Cart', url: '/shopingcart'},
    {title: 'Wish List', url: '/wishlist'},
    {title: 'Checkout', url: '/checkout'},
    {title: 'My Account', url: '/myacount'}
  ];
}
