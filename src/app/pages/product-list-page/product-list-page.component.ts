
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { IAppState } from 'src/app/store/app.store';
import { SetFilterCriteria } from 'src/app/store/actions/products.action';

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
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.routerSub = this.route.params
      .subscribe(item => {
        this.category = item.category;
        this.store.dispatch(new SetFilterCriteria(item.category));
      });
  }

  public ngOnDestroy(): void { }
}
