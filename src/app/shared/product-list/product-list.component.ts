import { Component, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { IAppState } from 'src/app/store/app.store';

import { LoadProducts } from '../../store/actions/products.action';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public aboutProductsText = `Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo,
    lacinia eget consectetur sed, convallis at tellus.`;
  public productsSub: Subscription;
  public productData: Array<IProductShortInfo>;
  public stepNumber = 8;
  public visibleNumber = 8;
  public isLoadMoreActive: boolean;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadProducts());

    this.productsSub = this.store.select(getAllProducts).subscribe(data => {
      this.productData = data;

      this.checkLoadMoreAbility();
    });
  }

  public loadMore(): void {
    this.visibleNumber += this.stepNumber;

    this.checkLoadMoreAbility();
  }

  public ngOnDestroy(): void { }

  private checkLoadMoreAbility(): void {
    this.isLoadMoreActive = this.visibleNumber < this.productData.length;
  }
}
