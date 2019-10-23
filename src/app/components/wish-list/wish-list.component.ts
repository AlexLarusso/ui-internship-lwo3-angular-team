import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from '../../store/app.store';
import { getLiked } from '../../store/selectors/wish-list.selectors';
import { SetToWishList } from '../../store/actions/wish-list.actions';

import { Observable, Subscription } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ProductFormat } from '../../app.enum';
import { ProductService } from '../../shared/services';
import { IProductShortInfo } from '../../interfaces';

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
  sub$;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>) { }

  public ngOnInit(): void {
    const localStorageLiked = JSON.parse(localStorage.getItem('liked'));

    if (localStorageLiked) {
      this.store.dispatch(new SetToWishList(localStorageLiked));
    }

    this.liked$ = this.store.select(getLiked);
    // this.liked$.subscribe(data => {
    //   this.stringArray = data;
    // });

    // this.getProductsSub = this.productService.getProducts(ProductFormat.short)
    // .subscribe(data => this.productData = data.filter((el) => {
    //   return this.stringArray.includes(el.productId.toString());
    // }));
    this.productService.getProducts(ProductFormat.short)
      .pipe(
      .mergeMap((data) => this.stringArray = data);
        });)
      );


  }

  public ngOnChanges() { }

  public ngOnDestroy(): void {}
}
