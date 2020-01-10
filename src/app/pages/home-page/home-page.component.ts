import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { IProductShortInfo } from 'src/app/interfaces';
import { ProductsFacade } from 'src/app/store/products/products.facade';

@AutoUnsubscribe()
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  public productList: Array<IProductShortInfo>;
  public products$: Observable<Array<IProductShortInfo>>;

  constructor(
    private productService: ProductService,
    public productsFacade: ProductsFacade
  ) { }

  public ngOnInit(): void {
    this.products$ = this.productsFacade.products$
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
