import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getFilteredProducts } from '../../store/selectors/products.selectors';
import { FilterByGender, FilterBySeason } from 'src/app/store/actions/products.action';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component ({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.html',
  styleUrls: ['./shop-by-category.scss']
})

export class ShopByCategoryComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() public filterCategory: string;

  public filterGenderSub: Subscription;
  public filterItemsSub: Subscription;
  public filteredItems: Array<IProductShortInfo>;

  constructor(
    private store: Store<IAppState>,
    private productService: ProductService,
    private cd: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.filterGenderSub = this.store
      .select(getFilteredProducts)
      .subscribe(items => this.filteredItems = items
        .map(item =>
          this.productService.formatProduct(item, ProductFormat.short)) as Array<IProductShortInfo>);
  }

  public ngAfterViewChecked(): void {
    this.filterCategory === 'women' || this.filterCategory === 'men' ?
      this.store.dispatch(new FilterByGender(this.filterCategory)) :
      this.store.dispatch(new FilterBySeason(this.filterCategory));

    this.cd.detectChanges();
  }

  public ngOnDestroy(): void { }
}
