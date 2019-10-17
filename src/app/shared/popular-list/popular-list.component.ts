import { Component, OnInit } from '@angular/core';
import { ProductShortInfoService } from '../services/product-short-info.service';
import { IProductShortInfo } from '../../interfaces/product-short-info.interface';

@Component({
  selector: 'app-popular-list',
  templateUrl: './popular-list.html',
  styleUrls: ['./popular-list.scss']
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
