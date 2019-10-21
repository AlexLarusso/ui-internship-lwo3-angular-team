import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { AddToWishList, RemoveFromWishList } from '../../store/actions/wish-list.actions';

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

  constructor(private store: Store<IAppState>) { }

  public toggleLike() {
    this.isLiked = !this.isLiked;
    console.log(this.isLiked);

    this.isLiked ?
      this.store.dispatch(new AddToWishList(this.productId))
      : this.store.dispatch(new RemoveFromWishList(this.productId));
  }
}
