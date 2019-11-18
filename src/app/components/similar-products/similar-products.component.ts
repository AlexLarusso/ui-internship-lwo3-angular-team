import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import {
  IProductShortInfo, IProductSimilarOptions, IProduct
 } from 'src/app/interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.html',
})
export class SimilarProductsComponent implements OnInit, OnDestroy {
  @Input() public product: IProduct;

  public similarProducts: Array<IProductShortInfo> = [];
  public productServiceSub: Subscription;

  private productSimilarOptions: IProductSimilarOptions;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.productSimilarOptions = {
      category: this.product.category,
      gender: this.product.gender,
      id: this.product._id
    };

    this.productServiceSub = this.productService
      .getSimilarProducts(this.productSimilarOptions, ProductFormat.short)
        .subscribe(products => this.similarProducts = products as Array<IProductShortInfo>);
  }

  public ngOnDestroy(): void { }
}
