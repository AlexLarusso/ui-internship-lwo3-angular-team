import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Observable, Subscription } from 'rxjs';

import { IProduct } from 'src/app/interfaces';
import { ProductService } from 'src/app/shared/services';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.html',
  styleUrls: ['./product-details-page.scss']
})

export class ProductDetailsPageComponent implements OnInit, OnDestroy {
  public productSource$: Observable<IProduct> = new Observable<IProduct>();
  public routerSub: Subscription;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.routerSub = this.route.params.subscribe(value => {
      this.productService.recentProductOrder(value.id);
      this.productSource$ = this.productService
         .getProductById(value.id) as Observable<IProduct>;
        }
    );
  }

  public ngOnDestroy(): void { }
}
