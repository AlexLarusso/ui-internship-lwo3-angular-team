
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { ProductsFacade } from 'src/app/store/products/products.facade';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.html',
})

export class ProductListPageComponent implements OnInit, OnDestroy {
  public routerSub: Subscription;
  public category: string;

  constructor(
    private route: ActivatedRoute,
    public productsFacade: ProductsFacade
  ) { }

  public ngOnInit(): void {
    this.routerSub = this.route.params
      .subscribe(item => {
        this.category = item.category;
        this.productsFacade.onSetFilterCriteria(item.category);
      });
  }

  public ngOnDestroy(): void { }
}
