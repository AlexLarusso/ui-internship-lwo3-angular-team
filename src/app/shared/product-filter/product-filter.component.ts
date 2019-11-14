import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/interfaces';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.html',
  styleUrls: ['./product-filter.scss']
})

export class ProductFilterComponent implements OnInit {
  @Input() public products: Array<IProduct>;

  public productCategory: Array<string> = [];
  public productColor: Array<string> = [];
  public productBrand: Array<string> = [];
  public filterRequest = [];
  public selectedProducts;
  public checkedCriteria: string;
  public criteriaName: string;

  public onCreateRequest(event) {
    if (event.change) {
      this.criteriaName = event.value;
      this.filterRequest.push(this.criteriaName);
    } else {
      this.filterRequest.filter(item => this.criteriaName !== item);
    }
  }

  public ngOnInit(): void {
    this.products.forEach(item => {
      this.productCategory.push(item.category);
      // this.productColor.push(item.colors);
      this.productBrand.push(item.brand);
    });
    this.productCategory = [...new Set(this.productCategory)];
    this.productColor = [...new Set(this.productColor)];
    this.productBrand = [...new Set(this.productBrand)];
  }

  // private onFilter() {
  //   this.filterRequest.forEach((criteria) =>
  //     this.products.forEach(product =>
  //       Object(product).forof((prop) =>
  //         prop === criteria ?
  //           this.selectedProducts.push(product) :
  //           this.selectedProducts))
  //   );
  // }
    //   this.selectedProducts = this.products.filter(product =>
    //   (!this.filterRequest.category.length || this.filterRequest.category.includes(product.category))
    //   &&
    //   (!this.filterRequest.brand.length || this.filterRequest.brand.includes(product.brand))
    //   &&
    //   (!this.filterRequest.color.length || this.filterRequest.color.includes(product.color))
    // );
}
