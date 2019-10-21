import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/reducers/app.reducer';
import * as wishListActions from '../../store/actions/wish-list.actions';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent {
  @Input() public imgUrl = '../../../assets/server-data/images/image-not-found.png';
  @Input() public productTitle = 'Product Title';
  @Input() public productPrice = 0;
  @Input() public productId = 1;

  public faHeart = faHeart;
  public product: IProduct;
  public isLiked = false;

  constructor(private store: Store<fromApp.AppState>) { }

  public toggleLike() {
    this.isLiked = !this.isLiked;
    console.log(this.isLiked);

    this.isLiked ?
      this.store.dispatch(new wishListActions.AddToWishList(this.productId))
      : this.store.dispatch(new wishListActions.RemoveFromWishList(this.productId));
  }
}
