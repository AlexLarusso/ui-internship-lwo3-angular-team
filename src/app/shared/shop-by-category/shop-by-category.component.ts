import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { getFilteredProducts } from '../../store/selectors/products.selectors';
import { LoadProducts, FilterByGender, FilterBySeason } from 'src/app/store/actions/products.action';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { IAppState } from 'src/app/store/app.store';

@AutoUnsubscribe()
@Component ({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.html',
  styleUrls: ['./shop-by-category.scss']
})

export class ShopByCategoryComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() public filterCategory: string;

  public filterGenderSub: Subscription;
  public filteredItems: Array<IProductShortInfo>;
  public filterItemsSub: Subscription;

  constructor(
     private store: Store<IAppState>,
     private cd: ChangeDetectorRef
    ) { }

  public ngOnInit(): void {
    this.store.dispatch(new LoadProducts());

    this.filterGenderSub = this.store.select(getFilteredProducts).subscribe(items => this.filteredItems = items);
  }

  public ngAfterViewChecked(): void {
    this.filterCategory === 'women' || this.filterCategory === 'men' ?
      this.store.dispatch(new FilterByGender(this.filterCategory)) :
      this.store.dispatch(new FilterBySeason(this.filterCategory));

    this.cd.detectChanges();
  }

  public ngOnDestroy(): void { }
}
