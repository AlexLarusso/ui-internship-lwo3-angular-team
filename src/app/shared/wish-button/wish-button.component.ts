import { Component, OnInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { AddToWishList, RemoveFromWishList, SetToWishList } from '../../store/actions/wish-list.actions';
import { getLiked } from '../../store/selectors/wish-list.selectors';

import { Observable } from 'rxjs';

import { faHeart } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    const localStorageLiked = JSON.parse(localStorage.getItem('liked'));

    if (localStorageLiked) {
      this.isLiked = localStorageLiked.includes(this.productId);
    }
  }

  public toggleLike(): void {
    this.isLiked = !this.isLiked;

    this.isLiked
      ? this.store.dispatch(new AddToWishList(this.productId))
      : this.store.dispatch(new RemoveFromWishList(this.productId));

    this.setAllToLocalStorage();
  }

  public ngOnDestroy(): void { }

  private setAllToLocalStorage(): void {
    this.liked$ = this.store.select(getLiked);
    let stringifyData: string;

    this.liked$.subscribe(data => stringifyData = JSON.stringify(data));
    localStorage.setItem('liked', stringifyData);
  }
}
