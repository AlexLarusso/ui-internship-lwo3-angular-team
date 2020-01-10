import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import {
  IProduct, IProductDetails, IProductOptions, IProductDescription, IProductCartItem
} from 'src/app/interfaces';
import { ProductOptionsFacade} from 'src/app/store/product-options/product-options.facade';

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
  @Input() public product: IProduct;

  public productDetails: IProductDetails;
  public selectedSizeSub: Subscription;
  public selectedColorSub: Subscription;
  public selectedQtySub: Subscription;
  public selectedSize: string;

  private selectedColor: string;
  private selectedQty: number;

  constructor(public productOptionsFacade: ProductOptionsFacade) { }

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
    const {
      productName: title,
      price,
      brand,
      category,
      gender,
      seasons: season,
      _id: productId
    } = this.product;

    this.productDetails = {
      title,
      price,
      brand,
      category,
      gender,
      season,
      productId,
      options: productOptions,
      description: productDescription,
    };
    this.productOptionsFacade.onSelectColor(initColor);
    this.selectedQtySub = this.productOptionsFacade.productQuantity$
      .subscribe(qty => this.selectedQty = qty);
    this.selectedColorSub = this.productOptionsFacade.productSelectedColor$
      .subscribe(color => this.selectedColor = color);
    this.selectedSizeSub = this.productOptionsFacade.productSelectedSize$
      .subscribe(size => this.selectedSize = size);
  }

  public ngOnDestroy(): void {
    this.productOptionsFacade.onResetProducts();
  }

  public onBuyClick(): void {
    const productCartItem: IProductCartItem = {
      id: this.product._id,
      title: this.product.productName,
      price: this.product.price,
      imageUrl: this.product.images.find(img =>
        img.value === this.selectedColor).url[0],
      color: this.selectedColor,
      size: this.selectedSize,
      quantity: this.selectedQty,
      maxQty: this.product.quantity
    };

    this.productOptionsFacade.onAddProduct(productCartItem);
  }

  public handleQtyChange(newQty: number) {
    newQty > this.selectedQty
      ? this.productOptionsFacade.onIncrementQuantity()
      : this.productOptionsFacade.onDecrementQuantity();
  }
}
