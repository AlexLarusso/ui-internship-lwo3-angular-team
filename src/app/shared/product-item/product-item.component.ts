import { Component, Input } from '@angular/core';

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
}
