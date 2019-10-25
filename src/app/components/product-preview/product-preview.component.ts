import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { IProductImage } from 'src/app/interfaces/product-image.interface';

import { IAppState } from 'src/app/store/app.store';
import { getProductSelectedColor } from 'src/app/store/selectors/product-options.selector';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrls: ['./product-preview.scss']
})
export class ProductPreviewComponent implements OnInit {
  @Input() private productImages: Array<IProductImage>;
  @Input() public productTitle: string;

  public imagesSource: Array<string>;
  public selectedImageID: number;

  private productSelectedColor: string;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.store.select(getProductSelectedColor)
      .subscribe(color => {
        this.selectedImageID = 0;
        this.productSelectedColor = color;
        this.imagesSource = this.findImagesSource();
      });
  }

  public onImageSelect(index: number): void {
    this.selectedImageID = index;
  }

  private findImagesSource(): Array<string> {
    const productImages = this.productSelectedColor
      ? this.productImages.find(images =>
          images.value === this.productSelectedColor)
      : this.productImages[0];

    return productImages ? productImages.url : [];
  }
}
