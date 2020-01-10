import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Observable } from 'rxjs';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { WishlistFacade } from 'src/app/store/wish-list/wish-list.facade';

@AutoUnsubscribe()
@Component({
  selector: 'app-wish-button',
  templateUrl: './wish-button.html',
  styleUrls: ['./wish-button.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishButtonComponent implements OnInit, OnDestroy {
  @Input() public productId: string;
  @Input() public wishClass: string;

  public faHeart = faHeart;
  public isLiked: boolean;
  public liked$: Observable<Array<string>>;

  constructor(public wishlistFacade: WishlistFacade) { }

  public ngOnInit(): void {
    const localStorageLiked = JSON.parse(localStorage.getItem('liked'));

    if (localStorageLiked) {
      this.isLiked = localStorageLiked.includes(this.productId);
    }
  }

  public toggleLike(): void {
    this.isLiked = !this.isLiked;

    this.isLiked
      ? this.wishlistFacade.addToWishList(this.productId)
      : this.wishlistFacade.removeFromWishList(this.productId);

    this.setAllToLocalStorage();
  }

  public ngOnDestroy(): void { }

  private setAllToLocalStorage(): void {
    this.liked$ = this.wishlistFacade.liked$;
    let stringifyData: string;

    this.liked$.subscribe(data => stringifyData = JSON.stringify(data));
    localStorage.setItem('liked', stringifyData);
  }
}
