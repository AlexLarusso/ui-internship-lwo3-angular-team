import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from '../../app.store';
import { getLiked } from './wish-list.selectors';
import { AddToWishList, RemoveFromWishList } from '../../store/wish-list/wish-list.actions';

@Injectable({
  providedIn: 'root'
})
export class WishlistFacade {
  public liked$ = this.store.select(getLiked);

  constructor(private store: Store<IAppState>) { }

  public addToWishList(payload): void {
    this.store.dispatch(new AddToWishList(payload));
  }

  public removeFromWishList(payload): void {
    this.store.dispatch(new RemoveFromWishList(payload));
  }
}
