import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProductShortInfoService } from '../services/product-short-info.service';
import { ProductService } from '../services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  constructor(
    private productService: ProductService,
    private shortInfoService: ProductShortInfoService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.productService
      .getProduct(Number(this.route.snapshot.paramMap.get('id')))
      .pipe(map(data => ({
        sex: data.sex,
        category: data.category,
        id: data.id
      })))
      .subscribe(data => this.shortInfoService.similarOptions = data);
  }

  public ngOnDestroy(): void {
  }
}
