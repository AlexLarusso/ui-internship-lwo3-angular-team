import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { IProductShortInfo } from 'src/app/interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  public productList: Array<IProductShortInfo>;
  public products$: Observable<Array<IProductShortInfo>>;

  constructor(
    private store: Store<IAppState>,
    private productService: ProductService
  ) { }

  public ngOnInit(): void {
    this.products$ = this.store.select(getAllProducts)
      .pipe(
        map(products => {
          const formattedProducts = products.map(product =>
            this.productService.formatProduct(product, ProductFormat.short));

          return this.productService.randomSortProducts(formattedProducts) as Array<IProductShortInfo>;
        })
      );
  }

  public ngOnDestroy(): void { }
}
