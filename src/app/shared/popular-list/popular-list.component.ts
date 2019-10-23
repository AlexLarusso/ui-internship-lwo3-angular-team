import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';

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

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.getProductsSub = this.productService.getProducts(ProductFormat.short)
      .subscribe(data => this.productData = data);
  }

  public ngOnDestroy(): void { }
}
