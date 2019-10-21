import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { ProductResolver } from 'src/app/shared/services/product.resolver';
import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductShortInfoService } from 'src/app/shared/services/product-short-info.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.html',
  providers: [ProductResolver]
})

export class ProductDetailsPageComponent implements OnInit, OnDestroy{
  public productSource$: Observable<IProduct> = new Observable<IProduct>();

  constructor(private productService: ProductService,
    private shortInfoService: ProductShortInfoService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.productSource$ = this.productService
        .getProduct(value.id);
    });

    this.productService
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
