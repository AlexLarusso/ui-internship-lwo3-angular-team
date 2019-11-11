import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/app.store';
import {
  getProductQuantity, getProductSelectedColor, getProductSelectedSize
} from 'src/app/store/selectors/product-options.selector';
import { SelectColor } from 'src/app/store/actions/product-options.actions';
import { NotificationService } from 'src/app/shared/services/notification.service';

import { Subscription } from 'rxjs';

import { faHeart, IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { IProduct } from 'src/app/interfaces/product.interface';
import { IProductDetails } from 'src/app/interfaces/product-details.interface';
import { IProductOptions } from 'src/app/interfaces/product-options.interface';
import { IProductDescription } from 'src/app/interfaces/product-description.interface';
import { IProductImage } from 'src/app/interfaces/product-image.interface';

const DELIVERY_MOCK = `Officia sint Lorem do officia velit voluptate. Dolor commodo pariatur
  irure do excepteur ullamco commodo pariatur et. Esse velit incididunt qui incididunt consectetur
  ea sit excepteur ex eu. Nisi esse dolore aute laborum.`;
const STYLE_MOCK = 'Ullamco eu ut consequat eu sit nostrud occaecat ad nulla nisi cupidatat.';

@AutoUnsubscribe()
@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.html',
  styleUrls: ['./product-order.scss']
})
export class ProductOrderComponent implements OnInit, OnDestroy {
  @Input() private product: IProduct;

  public iconWhishlistBtn: IconDefinition = faHeart;
  public productDetails: IProductDetails;
  public productImages: Array<IProductImage>;
  public selectedSizeSub: Subscription;
  public selectedColorSub: Subscription;
  public selectedQtySub: Subscription;
  public selectedSize: string;

  private selectedColor: string;
  private selectedQty: number;

  constructor(
    private store: Store<IAppState>,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
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
    const initColor = productOptions.colors[0];

    this.productDetails = {
      title: this.product.productName,
      price: this.product.price,
      brand: this.product.brand,
      category: this.product.category,
      gender: this.product.gender,
      season: this.product.seasons,
      productId: this.product._id,
      options: productOptions,
      description: productDescription,
    };
    this.productImages = this.product.images;

    this.store.dispatch(new SelectColor(initColor));

    this.selectedQtySub = this.store.select(getProductQuantity)
      .subscribe(qty => this.selectedQty = qty);
    this.selectedColorSub = this.store.select(getProductSelectedColor)
      .subscribe(color => this.selectedColor = color);
    this.selectedSizeSub = this.store.select(getProductSelectedSize)
      .subscribe(size => this.selectedSize = size);
  }

  public ngOnDestroy(): void { }

  public onBuyClick(): void {
    const title = `Added ${this.productDetails.title} to your cart.`;
    const message = `Quantity: ${this.selectedQty}.
      Size: ${this.selectedSize}.
      Color: ${this.selectedColor}.
      Full price: ${this.selectedQty * this.productDetails.price} uah.`;

    this.notificationService.success(title, message);
  }
}
