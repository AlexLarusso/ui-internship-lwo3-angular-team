import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getFilteredProducts } from '../../store/selectors/products.selectors';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.html',
  styleUrls: ['./shop-by-category.scss']
})

export class ShopByCategoryComponent implements OnInit, OnDestroy {
  @Input() public filterCategory: string;

  public filteredItems: Array<IProductShortInfo>;
  public filteredProductsSub: Subscription;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.filteredProductsSub = this.store.select(getFilteredProducts)
        .subscribe(products =>
          this.filteredItems = products.map(product =>
            this.productService.formatProduct(product, ProductFormat.short) as IProductShortInfo
          ));
  }

  public onDataChange(products: Array<IProductShortInfo>): void {
    this.filteredItems = products;
  }

  public ngOnDestroy(): void { }
}
