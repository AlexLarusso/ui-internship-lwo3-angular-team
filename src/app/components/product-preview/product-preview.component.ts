import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IconDefinition, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import { IAppState } from 'src/app/store/app.store';
import { getProductSelectedColor } from 'src/app/store/selectors/product-options.selector';

import { IProductMedia, IProductImage } from 'src/app/interfaces';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrls: ['./product-preview.scss']
})
export class ProductPreviewComponent implements OnInit {
  @Input() public productTitle: string;
  @Input() private productVideoUrl: string;
  @Input() private productImages: Array<IProductImage>;

  public productMedia$: Observable<Array<IProductMedia>>;
  public videoPreviewIcon: IconDefinition = faPlayCircle;
  public selectedMediaIndex: number;

  constructor(private store: Store<IAppState>) { }

  public ngOnInit(): void {
    this.productMedia$ = this.store.select(getProductSelectedColor).pipe(
      tap(() => this.selectedMediaIndex = 0),
      map(color => this.findImagesSource(color)),
      map(media => this.productVideoUrl
          ? [...media, { video: true, url: this.productVideoUrl }]
          : media),
    );
  }

  public onImageSelect(index: number): void {
    this.selectedMediaIndex = index;
  }

  private findImagesSource(productSelectedColor: string): Array<IProductMedia> {
    const productImages = productSelectedColor
      ? this.productImages.find(images =>
          images.value === productSelectedColor)
      : this.productImages[0];

    return productImages
      ? productImages.url.map(image => ({ video: false, url: image }))
      : [];
  }
}
