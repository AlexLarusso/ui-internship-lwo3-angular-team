import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { Observable } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { map } from 'rxjs/operators';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public aboutProductsText = `Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo,
    lacinia eget consectetur sed, convallis at tellus.`;
  public products$: Observable<Array<IProductShortInfo>>;
  public productLength: number;
  public stepNumber = 8;
  public visibleNumber = 8;
  public isLoadMoreActive: boolean;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.products$ = this.store.select(getAllProducts)
     .pipe(
      map(products => {
      this.productLength = products.length;

      this.checkLoadMoreAbility();

      return products.map(product =>
        this.productService.formatProduct(product, ProductFormat.short)) as Array<IProductShortInfo>;
     }));
  }

  public loadMore(): void {
    this.visibleNumber += this.stepNumber;

    this.checkLoadMoreAbility();
  }

  public ngOnDestroy(): void { }

  private checkLoadMoreAbility(): void {
    this.isLoadMoreActive = this.visibleNumber < this.productLength;
  }
}
