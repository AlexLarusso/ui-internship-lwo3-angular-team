import {
  Component, OnInit, OnDestroy
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { Subscription } from 'rxjs';

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
  public getProductsSub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.getProductsSub = this.store.select(getAllProducts)
      .subscribe(data => {
        this.productList = data
          .map(product =>
            this.productService.formatProduct(product, ProductFormat.short))
          .sort(() => Math.random() - 0.5) as Array<IProductShortInfo>;
    });
  }

  public ngOnDestroy(): void { }
}
