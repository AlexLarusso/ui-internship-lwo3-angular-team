import { Component, Input } from '@angular/core';

import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/interfaces/product.interface';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss']
})
export class ProductItemComponent {
  @Input() public src = '../../../assets/server-data/images/image-not-found.png'; 
  // TODO: Inputs and another decorators should go before other properties
  @Input() public title = 'Product Title';
  @Input() public price = 0;
  @Input() public productId = 1;

  public faHeart = faHeart;
  public product: IProduct;
}
