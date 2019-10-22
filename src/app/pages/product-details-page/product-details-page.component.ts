import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductResolver } from 'src/app/shared/services/product.resolver';
import { ProductShortInfoService } from 'src/app/shared/services/product-short-info.service';
import { ProductService } from 'src/app/shared/services/product.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.html',
  providers: [ProductResolver]
})

export class ProductDetailsPageComponent implements OnInit, OnDestroy{
  public productSource$: Observable<IProduct> = new Observable<IProduct>();
  public productSub: Subscription;
  public productsimilarOptionsSub: Subscription;

  constructor(private productService: ProductService,
    private shortInfoService: ProductShortInfoService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.productSub = this.route.params
      .subscribe(value => this.productSource$ =
        this.productService.getProduct(value.id));

    this.productsimilarOptionsSub = this.productService
      .getProduct(this.route.snapshot.paramMap.get('id'))
        .pipe(map(data => ({
          sex: data.sex,
          category: data.category,
          id: data.id
        })
      ))
      .subscribe(data => this.shortInfoService.similarOptions = data);
  }

  public ngOnDestroy(): void { }

}
