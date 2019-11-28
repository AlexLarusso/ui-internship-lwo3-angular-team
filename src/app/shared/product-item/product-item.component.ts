import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ProductService } from '../services/product.service';
import { ImagePlaceholder } from '../../app.enum';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent implements OnInit {
  public placeholderImage = ImagePlaceholder.IMAGE_NOT_FOUND;
  public isImageShown = false;
  public isImgLoaded: boolean;

  @Input() public imgUrl = this.placeholderImage;
  @Input() public imgUrlNext: string;
  @Input() public productTitle = 'Product Title';
  @Input() public productPrice = 0;
  @Input() public productId: string;
  @Input() public status = '';
  @Input() public hartScaled = false;

  public currentImageUrl: string;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.currentImageUrl = this.imgUrl;
  }

  public addIdToLocalStorage(id: string): void {
   this.productService.recentProductOrder(id);
  }

  public changeImageToNext(): void {
    this.currentImageUrl = this.imgUrlNext;
  }

  public changeImageToPrev(): void {
    this.currentImageUrl = this.imgUrl;
  }

  public onShowImage(): void {
    this.isImageShown = true;
  }
}
