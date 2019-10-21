import { Component, OnChanges, Input } from '@angular/core';
import { IProductImage } from 'src/app/interfaces/product-image.interface';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrls: ['./product-preview.scss']
})
export class ProductPreviewComponent implements OnChanges {
  @Input() public productImages: Array<IProductImage>;
  @Input() public productColorSelected: number;

  public imagesSource: Array<string>;
  public selectedImageID: number;

  public ngOnChanges(): void {
    this.selectedImageID = 0;
    if(this.productColorSelected) {
      this.imagesSource = this.productImages.find(images =>
        images.value == this.productColorSelected).url;
    } else {
      this.imagesSource = this.productImages[0].url;
    }
  }

  public onImageSelect(i: number): void {
    this.selectedImageID = i;
  }
}