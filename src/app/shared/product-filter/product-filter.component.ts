import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import { getFilteredProducts } from 'src/app/store/selectors/products.selectors';

import { ToastrService } from 'ngx-toastr';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs';

import { IProduct, IProductShortInfo } from 'src/app/interfaces';
import { ProductService } from '../services/product.service';
import { ProductFormat, ToastrMessage } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss']
})

export class ProductFilterComponent implements OnInit, OnDestroy {
  constructor(
    private readonly store: Store<IAppState>,
    private readonly productService: ProductService,
    private readonly toastrService: ToastrService
    ) { }

  @Output() public dataChange = new EventEmitter();

  public products: Array<IProduct>;
  public productCategory: Array<string> = [];
  public productBrand: Array<string> = [];
  public selectedProducts = [];
  public strictRequestItems = [];
  public criteriaName: string;
  public productSub: Subscription;
  public strictRequest = {
    brand: [],
    category: []
  };
  public checkboxIcon = faCheck;

  public ngOnInit(): void {
    this.productSub = this.store
      .select(getFilteredProducts).subscribe(filteredProducts => {
        this.products = filteredProducts;

        this.onSetFilters();
      });
  }

  public onCreateRequest(event): void {
    this.criteriaName = event.target.value;
    const indexCategory = this.productCategory.indexOf(this.criteriaName);

    if (event.target.checked) {
      indexCategory !== -1 ?
        this.strictRequest.category.push(this.criteriaName) :
        this.strictRequest.brand.push(this.criteriaName);
    } else {
      indexCategory !== -1 ?
        this.strictRequest.category = this.strictRequest.category
          .filter(criteria => criteria !== this.criteriaName) :
        this.strictRequest.brand = this.strictRequest.brand
          .filter(criteria => criteria !== this.criteriaName);
    }

    this.onFilter();
  }

  public ngOnDestroy(): void { }

  private onFilter(): void {
    this.strictRequest.category.length ||
      this.strictRequest.brand.length ?
      this.checkForItems() :
      this.dataChange.emit(this.onFormatItem(this.products));
  }

  private onSetFilters(): void {
    this.productCategory = [];
    this.productBrand = [];

    this.products.forEach(item => {
      this.productCategory.push(item.category);
      this.productBrand.push(item.brand);
    });

    this.productCategory = [...new Set(this.productCategory)];
    this.productBrand = [...new Set(this.productBrand)];
  }

  private onFormatItem(unformatedItems): Array<IProductShortInfo> {
    return unformatedItems.map(product =>
      this.productService
        .formatProduct(product, ProductFormat.short)) as Array<IProductShortInfo>;
  }

  private checkForItems(): void {
    this.selectedProducts = [];
    this.strictRequestItems = [];

    if (this.strictRequest.brand.length) {
      this.strictRequest.brand.forEach(brand =>
        this.products.forEach(product => {
          if (product.brand === brand) {
            this.selectedProducts.push(product);

            this.onStrictRequest(this.selectedProducts, this.strictRequest.category);
          }
        })
      );
    } else {
      this.strictRequest.category.forEach(category =>
        this.products.forEach(product => {
          if (product.category === category) {
            this.selectedProducts.push(product);

            this.onStrictRequest(this.selectedProducts, this.strictRequest.brand);
          }
        })
      );
    }

    this.strictRequestItems.length ?
      this.selectedProducts = [...new Set(this.strictRequestItems)] :
      this.selectedProducts = [...new Set(this.selectedProducts)];

    if (!this.selectedProducts.length) {
      this.toastrService.warning(ToastrMessage.filterFail);
    }

    this.dataChange.emit(this.onFormatItem(this.selectedProducts));
  }

  private onStrictRequest(selectedProducts, strictRequest: Array<string>): void {
    if (strictRequest.length) {
      strictRequest.forEach(category => {
        selectedProducts.forEach(product => {
          if (product.category === category) {
            this.strictRequestItems.push(product);
          } else {
            this.strictRequestItems.filter(item => item !== product);
            this.selectedProducts = [];
          }
        });
      });
    }
  }
}
