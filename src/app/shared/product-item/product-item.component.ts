import { Component, Input } from '@angular/core';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent {
  @Input() public imgUrl = '../../../assets/server-data/images/image-not-found.png';
  @Input() public productTitle = 'Product Title';
  @Input() public productPrice = 0;
  @Input() public productId: string;
  @Input() public status = '';
  constructor(private productService: ProductService) { }

  public addIdToLocalStorage(id: string): void {
   this.productService.recentProductOrder(id);
  }
}
