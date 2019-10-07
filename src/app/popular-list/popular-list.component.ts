import { Component, OnInit } from '@angular/core';
import { ProductShortInfoService } from '../product-short-info.service';
import { IProductShortInfo } from '../product-short-info';

@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.component.html',
  styleUrls: ['./popular-list.component.scss']
})
export class PopularListComponent implements OnInit {
  public filterItems = ['Trending', 'Bestsellers', 'New', 'On Sale'];
  public productData: Array<IProductShortInfo>;

  constructor(private productList: ProductShortInfoService) {
  }

  public ngOnInit(): void {
    this.productList.getShortInfo()
      .subscribe((data) => this.productData = data);
  }
}
