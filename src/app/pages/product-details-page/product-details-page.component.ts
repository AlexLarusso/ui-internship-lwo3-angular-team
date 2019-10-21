import { Component, OnChanges, ApplicationRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { ProductResolver } from 'src/app/shared/services/product.resolver';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductShortInfoService } from 'src/app/shared/services/product-short-info.service';
import { ProductService } from 'src/app/shared/services/product.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.html',
  providers: [ProductResolver]
})

export class ProductDetailsPageComponent implements OnChanges{
  public product: IProduct;

  constructor(private productService: ProductService,
    private shortInfoService: ProductShortInfoService,
    private route: ActivatedRoute) {
    }

  public ngOnInit(): void {
    this.route.params.subscribe(value =>
      this.productService
        .getProduct(value.id)
          .subscribe(data => this.changeProduct(data))
    );
  }

  ngOnChanges() {
  }

  public ngOnDestroy(): void { }

  private changeProduct(data: IProduct) {
    this.product = data;
    this.shortInfoService.similarOptions = {
      sex: data.sex,
      category: data.category,
      id: data.id
   };
  }
}
