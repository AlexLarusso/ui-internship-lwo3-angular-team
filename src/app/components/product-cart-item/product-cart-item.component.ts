import { Component, Input, OnInit } from '@angular/core';

import { CartFacade } from 'src/app/store/cart/cart.facade';

import { faTimesCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IProductCartItem } from 'src/app/interfaces';

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.html',
  styleUrls: ['./product-cart-item.scss']
})
export class ProductCartItemComponent implements OnInit {
  @Input() public productItem: IProductCartItem = null;
  @Input() public isLastItem = false;

  public closeIcon: IconDefinition = faTimesCircle;
  public currentCurrency = 'USD';
  public productRouterLink: string;

  constructor(public cartFacade: CartFacade) { }

  public ngOnInit(): void {
    this.productRouterLink = `/products/${this.productItem.id}`;
  }

  public removeItemFromCart(): void {
    this.cartFacade.removeItemFromCart(this.productItem);
  }

  public handleQtyChange(qty: number): void {
    this.cartFacade.handleQtyChange(
      { product: this.productItem, newQty: qty }
    );
  }
}
