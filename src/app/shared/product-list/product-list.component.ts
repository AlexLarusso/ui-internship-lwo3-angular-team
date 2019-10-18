import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { ProductShortInfoService } from '../services/product-short-info.service';
import { IProductShortInfo } from '../../interfaces/product-short-info.interface';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public aboutProductsText = `Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo,
    lacinia eget consectetur sed, convallis at tellus.`;
  public getProducts: Subscription;
  public productData: Array<IProductShortInfo>;

  constructor(private productList: ProductShortInfoService) {
  }

  public ngOnInit(): void {
    this.getProducts = this.productList.getShortInfo()
      .subscribe(data => this.productData = data);
  }

  public ngOnDestroy() {}
}
