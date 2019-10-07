import { Component } from '@angular/core';
import { faSearch, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {
  public faSearch = faSearch;
  public faCartArrowDown = faCartArrowDown;

  public menuItems = ['Shopping Cart', 'Wish List', 'Checkout', 'My Account'];
}
