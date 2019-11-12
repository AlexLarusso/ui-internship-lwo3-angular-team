import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss']
})

export class ProductFilterComponent implements OnInit {
  @Input() public products;

  public productCategory: Array<string>;
  public productColor: Array<string>;
  public productBrand: Array<string>;
  public filterRequest = {
    category: [],
    brand: [],
    color: []
  };
  public selectedProducts;
  public isChecked: boolean;

  public createRequest() {
    if (this.isChecked) {
      this.filterRequest
    }
  }

  public ngOnInit(): void {
    this.products.forEach(item => {
      this.productCategory.push(item.category);
      this.productColor.push(item.color);
      this.productBrand.push(item.brand);
    });
  }

  private onFilter() {
    this.products.filter(item => item);
    this.selectedProducts = this.products.filter(product =>
    (!this.filterRequest.category.length || this.filterRequest.category.includes(product.category))
    &&
    (!this.filterRequest.brand.length || this.filterRequest.brand.includes(product.brand))
    &&
    (!this.filterRequest.color.length || this.filterRequest.color.includes(product.color))
  );
  }
}
