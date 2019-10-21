import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { ProductShortInfoService } from '../services/product-short-info.service';
import { IProductShortInfo } from '../../interfaces/product-short-info.interface';

@AutoUnsubscribe()
@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.html',
  styleUrls: ['./popular-list.scss']
})
export class PopularListComponent implements OnInit, OnDestroy {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public getProductsSub: Subscription;
  public productData: Array<IProductShortInfo>;

  constructor(private productList: ProductShortInfoService) {
  }

  public ngOnInit(): void {
    this.getProductsSub = this.productList.getShortInfo()
      .subscribe(data => this.productData = data);
  }

  public ngOnDestroy(): void {}
}
