import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';

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
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.productListRefresh('Trending');
  }

  public sortByTag(item: string): void {
    this.productListRefresh(item);
  }

  public ngOnDestroy(): void { }

  private productListRefresh(item?: string): void {
    this.products$ = this.store.select(getAllProducts)
      .pipe(map(data =>
        data
          .filter(product => item === product.status)
          .map(product =>
            this.productService.formatProduct(product, ProductFormat.short)) as Array<IProductShortInfo>
      ));
  }
}
