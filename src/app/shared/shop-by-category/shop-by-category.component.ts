import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getFilteredProducts } from '../../store/selectors/products.selectors';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-shop-by-category',
  templateUrl: './shop-by-category.html',
  styleUrls: ['./shop-by-category.scss']
})

export class ShopByCategoryComponent implements OnInit, OnDestroy {
  @Input() public filterCategory: string;

  public filterItemsSub: Subscription;
  public routeParamsSub: Subscription;
  public filteredItems: Array<IProductShortInfo>;

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.routeParamsSub = this.route.params.pipe()
      .subscribe(item => {
        this.filterCategory = item.category;
      });

    this.getProductsByCategory();
  }

  public ngOnDestroy(): void { }

  private getProductsByCategory(): void {
    this.filterItemsSub = this.store
      .select(getFilteredProducts)
      .subscribe(items => this.filteredItems = items
        .map(item =>
          this.productService.formatProduct(item, ProductFormat.short)) as Array<IProductShortInfo>);
  }
}
