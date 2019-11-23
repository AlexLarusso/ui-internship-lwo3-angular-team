import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getFilteredProducts } from '../../store/selectors/products.selectors';

import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { ProductFormat } from 'src/app/app.enum';

@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.html',
  styleUrls: ['./shop-by-category.scss']
})

export class ShopByCategoryComponent implements OnInit {
  public filteredItems$: Observable<Array<IProductShortInfo>>;
  public routeParamsSub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.filteredItems$ = this.store.select(getFilteredProducts).pipe(
      map(products => products.map(product =>
          this.productService.formatProduct(product, ProductFormat.short) as IProductShortInfo
        )
    ));
  }
}
