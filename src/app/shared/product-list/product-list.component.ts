import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { Subscription } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { ProductFormat } from 'src/app/app.enum';

const BREAK_POINTS = {
  mobile: {
    width: 575,
    visibleNumber: 4
  },
  tablet_S: {
    width: 576,
    visibleNumber: 6
  },
  tablet_M: {
    width: 768,
    visibleNumber: 8
  },
  laptop_L: {
    width: 1201,
    visibleNumber: 16
  }
};

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
  public pageWidth: number;
  public stepNumber: number;
  public visibleNumber: number;
  public isLoadMoreActive: boolean;

  @HostListener('window:resize', [])
  public onResize(): void {
    this.indicateStepNumber();
  }

  constructor(
    private productService: ProductService,
    private store: Store<IAppState>
  ) { }

  public ngOnInit(): void {
    this.pageWidth = window.innerWidth;

    this.indicateStepNumber();

    this.visibleNumber = this.stepNumber;

    this.productsSub = this.store.select(getAllProducts)
      .subscribe(data => {
        this.productData = data
          .map(product =>
            this.productService.formatProduct(product, ProductFormat.short))
          .sort(() => Math.random() - 0.5) as Array<IProductShortInfo>;

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

  private indicateStepNumber(): void {
    switch (true) {
      case this.pageWidth > BREAK_POINTS.laptop_L.width:
        this.stepNumber = BREAK_POINTS.laptop_L.visibleNumber;
        break;
      case this.pageWidth > BREAK_POINTS.tablet_M.width:
        this.stepNumber = BREAK_POINTS.tablet_M.visibleNumber;
        break;
      case this.pageWidth > BREAK_POINTS.tablet_S.width:
        this.stepNumber = BREAK_POINTS.tablet_S.visibleNumber;
        break;
      default:
        this.stepNumber = BREAK_POINTS.mobile.visibleNumber;
    }
  }
}
