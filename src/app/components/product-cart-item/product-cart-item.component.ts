import { Component, Input } from '@angular/core';

import { faTimesCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { IProductCartItem } from 'src/app/interfaces';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { RemoveProductFromCart } from 'src/app/store/actions/cart.actions';

@Component({
  selector: 'app-product-cart-item',
  templateUrl: './product-cart-item.html',
  styleUrls: ['./product-cart-item.scss']
})
export class ProductCartItemComponent {
  @Input() public productItem: IProductCartItem = null;
  @Input() public isLastItem = false;

  public closeIcon: IconDefinition = faTimesCircle;
  public currentCurrency = 'UAH';

  constructor(private store: Store<IAppState>) { }

  public removeItemFromCart(): void {
    this.store.dispatch(new RemoveProductFromCart(this.productItem.id));
  }
}
