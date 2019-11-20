import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';

import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';

import { IProduct, IProductShortInfo } from 'src/app/interfaces';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { IAppState } from 'src/app/store/app.store';
import { getFilteredProducts } from 'src/app/store/selectors/products.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ProductService } from '../services/product.service';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss']
})

export class ProductFilterComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<IAppState>,
    private productService: ProductService) { }

  @Output() public dataChange = new EventEmitter();

  public products: Array<IProduct>;
  public productCategory: Array<string> = [];
  public productBrand: Array<string> = [];
  public filterRequest = [];
  public selectedProducts = [];
  public categoryItems = [];
  public checkedCriteria: string;
  public criteriaName: string;
  public criteriaIndex: number;
  public checkboxIcon = faCheck;
  public productSub: Subscription;
  public formatedItems = [];
  public strictRequestItems = [];
  public strictRequest = {
    brand: [],
    category: []
  };

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
    this.strictRequest.category.length || this.strictRequest.brand.length ?
      this.checkForItems() :
      this.dataChange.emit(this.onFormatItem(this.products));
  }

  private onSetFilters() {
    this.productCategory = [];
    this.productBrand = [];
    this.products.forEach(item => {
      this.productCategory.push(item.category);
      this.productBrand.push(item.brand);
    });
    this.productCategory = [...new Set(this.productCategory)];
    this.productBrand = [...new Set(this.productBrand)];
  }

  private onFormatItem(unformatedItems) {
    return unformatedItems.map(product =>
      this.productService
      .formatProduct(product, ProductFormat.short)) as Array<IProductShortInfo>;
  }

  private checkForItems(): void {
    this.selectedProducts = [];
    this.strictRequestItems = [];

    this.strictRequest.brand.forEach(brand =>
      this.products.forEach(product => {
        if (product.brand === brand) {
          this.selectedProducts.push(product);
          if (this.strictRequest.category.length) {
          this.strictRequest.category.forEach(category => {
            if (product.category === category) {
              this.strictRequestItems.push(product);
            } else {
              this.selectedProducts = [];
            }
          });
          }
        }
      }
      )
    );

    this.strictRequestItems.length ?
      this.selectedProducts = [...new Set(this.strictRequestItems)] :
      this.selectedProducts = [...new Set(this.selectedProducts)];
    this.dataChange.emit(this.onFormatItem(this.selectedProducts));
  }
}
