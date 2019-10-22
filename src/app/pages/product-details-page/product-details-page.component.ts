import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { IProduct } from 'src/app/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.html',
})

export class ProductDetailsPageComponent implements OnInit, OnDestroy{
  public productSource$: Observable<IProduct> = new Observable<IProduct>();

  constructor(private productService: ProductService,
    private route: ActivatedRoute) { }

  public ngOnInit(): void {
    console.log('pdp');
    
    this.route.params.subscribe(value => {
      this.productSource$ = this.productService
        .getProductById(value.id);
    });
  }

  public ngOnDestroy(): void { }

}
