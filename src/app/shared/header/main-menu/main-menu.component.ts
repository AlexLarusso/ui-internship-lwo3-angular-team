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

  public menuItems = ['Shopping Cart', 'Wish List', 'Checkout', 'My Account'];
}
