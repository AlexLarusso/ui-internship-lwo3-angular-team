import {
  Component, OnInit, OnDestroy, HostListener, Input, ChangeDetectionStrategy
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getAllProducts } from 'src/app/store/selectors/products.selectors';

import { Observable } from 'rxjs';

import { IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services';
import { map } from 'rxjs/operators';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  @Input() public listTitle = 'From Our Collection';

  public pageWidth: number;
  public stepNumber: number;
  public visibleNumber: number;
  public products$: Observable<Array<IProductShortInfo>>;
  public productLength: number;
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

    this.products$ = this.store.select(getAllProducts)
     .pipe(
        map(products => {
          this.productLength = products.length;

          const formattedProducts = products.map(product =>
            this.productService.formatProduct(product, ProductFormat.short));

          this.checkLoadMoreAbility();

          return this.productService.randomSortProducts(formattedProducts) as Array<IProductShortInfo>;
        })
      );
  }

  public loadMore(): void {
    this.visibleNumber += this.stepNumber;

    this.checkLoadMoreAbility();
  }

  public ngOnDestroy(): void { }

  private checkLoadMoreAbility(): void {
    this.isLoadMoreActive = this.visibleNumber < this.productLength;
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
