import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { IProductImage } from 'src/app/interfaces/product-image.interface';

import { IAppState } from 'src/app/store/app.store';
import { getProductSelectedColor } from 'src/app/store/selectors/product-options.selector';


@AutoUnsubscribe()
@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrls: ['./product-preview.scss']
})
export class ProductPreviewComponent implements OnInit, OnDestroy {
  @Input() private productImages: Array<IProductImage>;
  @Input() public productTitle: string;

  public imagesSource: Array<string>;
  public selectedImageID: number;
  public productSelectedColorSub: Subscription;

  private productSelectedColor: string;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.productSelectedColorSub = this.store.select(getProductSelectedColor)
      .subscribe(color => {
        this.selectedImageID = 0;
        this.productSelectedColor = color;
        this.imagesSource = this.findImagesSource();
      });
  }

  public ngOnDestroy() { }

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
