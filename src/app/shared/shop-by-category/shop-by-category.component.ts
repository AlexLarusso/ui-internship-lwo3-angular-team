import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { ProductFormat } from 'src/app/app.enum';
import { ProductsFacade } from 'src/app/store/products/products.facade';

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
    public productsFacade: ProductsFacade
  ) { }

  public ngOnInit(): void {
    this.filteredProductsSub = this.productsFacade.filteredProducts$
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
