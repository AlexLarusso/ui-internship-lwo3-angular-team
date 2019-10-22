import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductShortInfoService } from '../../shared/services/product-short-info.service';
import { IProductShortInfo } from '../../interfaces/product-short-info.interface';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { getLiked } from '../../store/selectors/wish-list.selectors';
import { SetToWishList } from '../../store/actions/wish-list.actions';
import { combineLatest } from "rxjs/observable/combineLatest";

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.html',
  styleUrls: ['./wish-list.scss']
})
export class WishListComponent implements OnInit, OnDestroy {
  public getProductsSub: Subscription;
  public productData: Array<IProductShortInfo>;
  liked$: Observable<Array<string>>;
  stringArray: Array<string>;

  constructor(
    private productList: ProductShortInfoService,
    private store: Store<IAppState>) { }

  public ngOnInit(): void {
    const localStorageLiked = JSON.parse(localStorage.getItem('liked'));

    if (localStorageLiked) {
      this.store.dispatch(new SetToWishList(localStorageLiked));
    }

    this.liked$ = this.store.select(getLiked);
    console.log(this.stringArray);
    this.liked$.subscribe(data => {
      this.stringArray = data;
    });

    this.getProductsSub = this.productList.getShortInfo()
      .subscribe(data => this.productData = data.filter((el) => {
        return this.stringArray.includes(el.productId.toString());
      }));
  }

  public ngOnChanges() { }

  public ngOnDestroy(): void {}
}
