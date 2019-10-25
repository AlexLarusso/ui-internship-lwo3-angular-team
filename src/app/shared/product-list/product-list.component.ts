import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductFormat } from 'src/app/app.enum';
import { ProductService } from 'src/app/shared/services';

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
  public getProductsSub: Subscription;
  public productData: Array<IProductShortInfo>;
  public stepNumber = 8;
  public visibleNumber = 0;
  public isLoadMoreActive: boolean;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.getProductsSub = this.productService.getProducts(ProductFormat.short)
      .subscribe(data => {
        this.productData = data;

        this.loadMore();
      });
    }

  public loadMore(): void {
    this.visibleNumber += this.stepNumber;
    this.isLoadMoreActive = this.visibleNumber < this.productData.length;
  }

  public ngOnDestroy(): void { }
}
