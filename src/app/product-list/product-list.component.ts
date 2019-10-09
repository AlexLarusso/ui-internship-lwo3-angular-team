import { Component, OnInit } from '@angular/core';
import { ProductShortInfoService } from '../product-short-info.service';
import { IProductShortInfo } from '../product-short-info';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public aboutProductsText = `Pellentesque in ipsum id orci porta dapibus. Vivamus magna justo,
    lacinia eget consectetur sed, convallis at tellus.`;
  public productData: Array<IProductShortInfo>;

  constructor(private productList: ProductShortInfoService) {
  }

  public ngOnInit(): void {
    this.productList.getShortInfo()
      .subscribe((data) => this.productData = data);
  }
}



