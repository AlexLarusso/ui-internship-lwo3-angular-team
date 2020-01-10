import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { CartFacade } from '../../store/cart/cart.facade';
import { IProductCartItem } from 'src/app/interfaces';

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

  constructor(public cartFacade: CartFacade) { }

  public ngOnInit(): void {
    this.cartProductList$ = this.cartFacade.cartProductList$;
    this.cartTotalPrice$ = this.cartFacade.cartTotalPrice$;
  }

  public displayPopularList(): void {
    this.isPopularListVisible = true;
  }

  public confirmOrder(): void {
    this.cartFacade.confirmOrder();
  }
}
