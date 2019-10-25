import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { IAppState } from '../../store/app.store';
import { getLiked } from '../../store/selectors/wish-list.selectors';

import { Observable, Subscription } from 'rxjs';

import { ProductFormat } from '../../app.enum';
import { ProductService } from '../../shared/services';
import { IProductShortInfo } from '../../interfaces';
import { map, switchMap } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.html',
  styleUrls: ['./wish-list.scss']
})
export class WishListComponent implements OnInit, OnDestroy {
  public getProducts: Observable<Array<IProductShortInfo>>;
  public getLikeSub: Subscription;
  public productData: Array<IProductShortInfo> = [];
  liked$: Observable<Array<string>>;
  likedArray: Array<string>;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.liked$ = this.store.select(getLiked);

    this.getProducts = this.productService.getProducts(ProductFormat.short);

    this.getLikeSub = this.liked$.pipe(switchMap(
      likedProducts => {
        this.likedArray = likedProducts;

        return this.getProducts.pipe(
          map(products => {
            this.productData = products;
            this.productData = this.productData.filter(el => this.likedArray.includes(el.productId));
          })
        );
      }
    )).subscribe();
  }

  public ngOnDestroy(): void { }
}
