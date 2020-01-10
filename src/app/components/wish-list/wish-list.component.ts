import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { WishlistFacade } from 'src/app/store/wish-list/wish-list.facade';
import { ProductsFacade } from 'src/app/store/products/products.facade';

import { ProductFormat, ToastrMessage } from '../../app.enum';
import { ProductService } from '../../shared/services';
import { IProductShortInfo } from '../../interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.html',
  styleUrls: ['./wish-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WishListComponent implements OnInit, OnDestroy {
  public liked$: Observable<Array<string>>;
  public products$: Observable<Array<any>>;
  public getLikeSub: Subscription;
  public productData: Array<IProductShortInfo> = [];
  public likedArray: Array<string>;

  constructor(
    private productService: ProductService,
    private toastrService: ToastrService,
    public wishlistFacade: WishlistFacade,
    public productsFacade: ProductsFacade
  ) { }

  public ngOnInit(): void {
    this.liked$ = this.wishlistFacade.liked$;

    this.products$ = this.productsFacade.products$;

    this.getLikeSub = this.liked$.pipe(switchMap(
      likedProducts => {
        this.likedArray = likedProducts;

        return this.products$.pipe(
          map(products =>
            products
              .map(product =>
                (this.productService.formatProduct(product, ProductFormat.short)) as IProductShortInfo)
              .filter(el => this.likedArray.includes(el.productId))
          )
        );
      }
    )).subscribe(productArray => {
      this.productData = productArray;

      if (!this.productData.length) {
        this.toastrService.warning(ToastrMessage.emptyWishList);
      }
    });
  }

  public ngOnDestroy(): void { }
}
