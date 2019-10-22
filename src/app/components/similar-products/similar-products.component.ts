import { Component, OnDestroy, Input } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/services/product.service';
import { ProductFormat } from 'src/app/app.enum';

import { IProductShortInfo } from 'src/app/interfaces/product-short-info.interface';
import { IProductSimilarOptions } from 'src/app/interfaces/product-similar-options.interface';
import { IProduct } from 'src/app/interfaces/product.interface';

@AutoUnsubscribe()
@Component({
  selector: 'app-similar-products',
  templateUrl: './similar-products.html',
})
export class SimilarProductsComponent implements OnDestroy {
  @Input() product: IProduct;

  public similarProductsArray: Array<IProductShortInfo> = [];

  private productSimilarOptions: IProductSimilarOptions;
  private productServiceSub: Subscription;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.productSimilarOptions = {
      category: this.product.category,
      sex: this.product.sex,
      id: this.product.id
    };
    this.productService
      .getSimilarProducts(this.productSimilarOptions, ProductFormat.short)
        .subscribe(products => this.similarProductsArray = products);
  }

  public ngOnDestroy(): void { }
}
