import { Component, Input } from '@angular/core';
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
  @Input() productItem: IProductCartItem = null;
  
  constructor(private store: Store<IAppState>) { }

  public removeItemFromCart(): void {
    this.store.dispatch(new RemoveProductFromCart(this.productItem.id));
  }
}