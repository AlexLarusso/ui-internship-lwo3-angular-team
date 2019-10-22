import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { AddToWishList, RemoveFromWishList, SetToWishList } from '../../store/actions/wish-list.actions';
import { getLiked } from '../../store/selectors/wish-list.selectors';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/interfaces/product.interface';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent implements OnInit, OnDestroy {
  @Input() public imgUrl = '../../../assets/server-data/images/image-not-found.png';
  @Input() public productTitle = 'Product Title';
  @Input() public productPrice = 0;
  @Input() public productId: string;

  public faHeart = faHeart;
  public product: IProduct;
  public isLiked: boolean;
  public liked$: Observable<Array<string>>;
  public subs: Subscription;
  str;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit() {
    const localStorageLiked = JSON.parse(localStorage.getItem('liked'));

    if (localStorageLiked) {
      this.store.dispatch(new SetToWishList(localStorageLiked));
      this.isLiked = localStorageLiked.includes(this.productId);
    }
  }

  public toggleLike() {
    this.isLiked = !this.isLiked;

    this.isLiked
      ? this.store.dispatch(new AddToWishList(this.productId))
      : this.store.dispatch(new RemoveFromWishList(this.productId));

    this.store.select(getLiked).subscribe(data => this.str = data)
    console.log(this.str);

    this.setAllToLocalStorage();
  }

  public setAllToLocalStorage() {
    this.liked$ = this.store.select(getLiked);
    let stringArray;

    this.liked$.subscribe(data => stringArray = JSON.stringify(data));
    localStorage.setItem('liked', stringArray);
  }

  public ngOnDestroy() { }
}
