import { Component, OnInit, Input } from '@angular/core';
import { IProductImage } from 'src/app/interfaces/product-image.interface';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrls: ['./product-preview.scss']
})
export class ProductPreviewComponent implements OnInit {
  @Input() public productImages: Array<IProductImage>;
  @Input() public productColorSelected: number;

  public imagesSource: Array<string>;
  public selectedImageID: number;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.selectedImageID = 0;
    if(this.productColorSelected) {
      this.imagesSource = this.productImages.find(images =>
        images.value == this.productColorSelected).url;
    } else {
      this.imagesSource = this.productImages[0].url;
    }
  }

  onImageSelect(i: number) {
    this.selectedImageID = i;
  }
}