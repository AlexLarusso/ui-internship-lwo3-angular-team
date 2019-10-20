import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { IProductDetails } from 'src/app/interfaces/product-details.interface';
import { faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';

const DELIVERY_MOCK = 'Officia sint Lorem do officia velit voluptate. Dolor commodo pariatur irure do excepteur ullamco commodo pariatur et. Esse velit incididunt qui incididunt consectetur ea sit excepteur ex eu. Nisi esse dolore aute laborum.'

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.html',
  styleUrls: ['./product-order.scss']
})
export class ProductOrderComponent {
  @Input() private product: IProduct;
    
  public productDetails: IProductDetails;
  public iconWhishlistBtn: IconDefinition = faHeart;

  constructor() {}
  
  public ngOnInit() {
    this.productDetails = {
      title: this.product.productName,
      price: this.product.price,
      options: {
        colors: this.product.colors,
        sizes: this.product.sizes,
        quantity: this.product.quantity
      },
      description: {
        brand: this.product.brand,
        category: this.product.category,
        sex: this.product.sex,
        detail: this.product.description,
        delivery: DELIVERY_MOCK,
        season: this.product.season,
      }
    }
  }
}