import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { ProductsFacade } from 'src/app/store/products/products.facade';

@AutoUnsubscribe()
@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.html',
  styleUrls: ['./popular-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopularListComponent implements OnInit, OnDestroy {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public products$: Observable<Array<IProductShortInfo>>;
  public productData: Array<IProductShortInfo>;

  constructor(
    private productService: ProductService,
    public productsFacade: ProductsFacade
  ) { }

  public ngOnInit(): void {
    this.productListRefresh('Trending');
  }

  public sortByTag(item: string): void {
    this.productListRefresh(item);
  }

  public ngOnDestroy(): void { }

  private productListRefresh(item?: string): void {
    this.products$ = this.productsFacade.products$
      .pipe(map(data =>
        data
          .filter(product => item === product.status)
          .map(product =>
            this.productService.formatProduct(product, ProductFormat.short)) as Array<IProductShortInfo>
      ));
  }
}
