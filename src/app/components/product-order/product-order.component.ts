import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/product.interface';
import { IProductDetails } from 'src/app/interfaces/product-details.interface';
import { faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IProductOptions } from 'src/app/interfaces/product-options.interface';
import { IProductDescription } from 'src/app/interfaces/product-description.interface';
import { IProductImage } from 'src/app/interfaces/product-image.interface';

const DELIVERY_MOCK = 'Officia sint Lorem do officia velit voluptate. Dolor commodo pariatur irure do excepteur ullamco commodo pariatur et. Esse velit incididunt qui incididunt consectetur ea sit excepteur ex eu. Nisi esse dolore aute laborum.'
const STYLE_MOCK = 'Ullamco eu ut consequat eu sit nostrud occaecat ad nulla nisi cupidatat.';
@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.html',
  styleUrls: ['./product-order.scss']
})
export class ProductOrderComponent {
  @Input() private product: IProduct;

  public productDetails: IProductDetails;
  public iconWhishlistBtn: IconDefinition = faHeart;
  public productImages: Array<IProductImage>;

  public selectedSize: string;
  public selectedColor: number;
  public selectedQty: number;

  constructor() {}

  public ngOnInit() {
    const productOptions: IProductOptions = {
      colors: this.product.colors,
      sizes: this.product.sizes,
      quantity: this.product.quantity
    };
    const productDescription: IProductDescription = {
      detail: this.product.description,
      style: STYLE_MOCK,
      delivery: DELIVERY_MOCK,
    };
    this.productDetails = {
      title: this.product.productName,
      price: this.product.price,
      brand: this.product.brand,
      category: this.product.category,
      sex: this.product.sex,
      season: this.product.season,
      options: productOptions,
      description: productDescription,
    }
    this.productImages = this.product.images;
  }

  public handleSizeSelect(event: string) {
    this.selectedSize = event;
    console.log(event);
  }

  public handleColorSelect(event: number) {
    console.log(event);
    this.selectedColor = event;
  }
}