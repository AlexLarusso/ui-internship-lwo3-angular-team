import { Component, Input, OnInit } from '@angular/core';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() public imgUrl: string;
  @Input() public imgUrlNext: string;
  @Input() public productTitle = 'Product Title';
  @Input() public productPrice = 0;
  @Input() public productId: string;
  @Input() public status = '';

  public currentImageUrl: string;

  constructor(private productService: ProductService) { }

  public ngOnInit() {
    this.currentImageUrl = this.imgUrl;
  }

  public addIdToLocalStorage(id: string): void {
   this.productService.recentProductOrder(id);
  }

  public changeImageToNext() {
    this.currentImageUrl = this.imgUrlNext;
  }

  public changeImageToPrev() {
    this.currentImageUrl = this.imgUrl;
  }
}
