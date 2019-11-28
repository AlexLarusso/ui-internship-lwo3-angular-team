import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { faTimesCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { IProductCartItem } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { RemoveProductFromCart, ChangeProductItemQty } from 'src/app/store/actions/cart.actions';

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

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.productRouterLink = `/products/${this.productItem.id}`;
  }

  public removeItemFromCart(): void {
    this.store.dispatch(new RemoveProductFromCart(this.productItem));
  }

  public handleQtyChange(qty: number): void {
    this.store.dispatch(new ChangeProductItemQty(
      { product: this.productItem, newQty: qty }
    ));
  }
}
