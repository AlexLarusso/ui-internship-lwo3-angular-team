import { Component, Input } from '@angular/core';

import { ProductService } from '../services/product.service';
import { ImagePlaceholder } from '../../app.enum';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent {
  public placeholderImage = ImagePlaceholder.IMAGE_NOT_FOUND;
  @Input() public imgUrl = this.placeholderImage;
  @Input() public productTitle = 'Product Title';
  @Input() public productPrice = 0;
  @Input() public productId: string;
  @Input() public status = '';

  constructor(private productService: ProductService) { }

  public addIdToLocalStorage(id: string): void {
   this.productService.recentProductOrder(id);
  }
}
