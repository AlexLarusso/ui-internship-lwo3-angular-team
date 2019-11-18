import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProduct } from 'src/app/interfaces';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss']
})

export class ProductFilterComponent implements OnInit {
  @Input() public products: Array<IProduct>;
  @Output() public dataChange = new EventEmitter();

  public productCategory: Array<string> = [];
  public productBrand: Array<string> = [];
  public filterRequest = [];
  public selectedProducts = [];
  public categoryItems = [];
  public checkedCriteria: string;
  public criteriaName: string;
  public criteriaIndex: number;
  public checkboxIcon = faCheck;
  public requestObj = {
    brand: [],
    category: []
  };

  public onCreateRequest(event): void {
    this.criteriaName = event.target.value;

    this.filterRequest = event.target.checked ?
      [...this.filterRequest, this.criteriaName] :
      this.filterRequest.filter(item => this.criteriaName !== item);

    this.onFilter();
  }

  public ngOnInit(): void {
    this.categoryItems = this.products;
    this.products.forEach(item => {
      this.productCategory.push(item.category);
      this.productBrand.push(item.brand);
    });
    this.productCategory = [...new Set(this.productCategory)];
    this.productBrand = [...new Set(this.productBrand)];
  }

  private onFilter(): void {
    this.filterRequest.length ?
      this.checkForItems() :
      this.dataChange.emit(this.categoryItems);
  }

  private checkForItems(): void {
    this.selectedProducts = [];

    this.filterRequest.forEach(criteria =>
      this.categoryItems.forEach(product => {
        for (const prop in product) {
          if (product[prop] === criteria) {
            this.selectedProducts.push(product);
          }
        }
      }
      )
    );
    this.selectedProducts = [...new Set(this.selectedProducts)];
    this.dataChange.emit(this.selectedProducts);
  }
}
