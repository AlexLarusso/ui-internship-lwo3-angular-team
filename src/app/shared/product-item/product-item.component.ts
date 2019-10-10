import { Component, Input } from '@angular/core';

import { faHeart }  from '@fortawesome/free-solid-svg-icons';
import { IProduct } from 'src/app/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  public faHeart = faHeart;
  public product: IProduct;

  @Input() public src = '../../../assets/server-data/images/image-not-found.png';
  @Input() public title = 'Product Title';
  @Input() public price = 0;
  @Input() public id = 1;
}
