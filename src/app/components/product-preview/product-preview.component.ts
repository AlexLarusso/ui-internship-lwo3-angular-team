import { Component, OnChanges, Input } from '@angular/core';
import { IProductImage } from 'src/app/interfaces/product-image.interface';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrls: ['./product-preview.scss']
})
export class ProductPreviewComponent implements OnChanges {
  @Input() private productImages: Array<IProductImage>;
  @Input() private productSelectedColor: number;
  @Input() public productTitle: string;

  public imagesSource: Array<string>;
  public selectedImageID: number;

  public ngOnChanges(): void {
    this.selectedImageID = 0;
    this.imagesSource = this.findImagesSource();
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
