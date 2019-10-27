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
  public products$: Observable<Array<IProductShortInfo>>;
  public getLikeSub: Subscription;
  public productData: Array<IProductShortInfo> = [];
  public liked$: Observable<Array<string>>;
  public likedArray: Array<string>;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.liked$ = this.store.select(getLiked);

    this.products$ = this.productService.getProducts(ProductFormat.short);

    this.getLikeSub = this.liked$.pipe(switchMap(
      likedProducts => {
        this.likedArray = likedProducts;

        return this.products$.pipe(
          map(products =>
            products.filter(el => this.likedArray.includes(el.productId))
          )
        );
      }
    )).subscribe(productArray => this.productData = productArray);
  }

  public ngOnDestroy(): void { }
}
