import {
    Component,
    Input,
    OnInit,
    HostListener,
    ViewChild
  } from '@angular/core';

import { NgxImageZoomComponent } from 'ngx-image-zoom';

import { Store } from '@ngrx/store';
import { getProductSelectedColor } from 'src/app/store/selectors/product-options.selector';
import { IAppState } from 'src/app/store/app.store';

import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { IconDefinition, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import { IProductMedia, IProductImage } from 'src/app/interfaces';
import { ImagePlaceholder } from 'src/app/app.enum';

@Component({
  selector: 'app-product-preview',
  templateUrl: './product-preview.html',
  styleUrls: ['./product-preview.scss']
})
export class ProductPreviewComponent implements OnInit {
  @Input() public productTitle: string;
  @Input() private productVideoUrl: string;
  @Input() private productImages: Array<IProductImage>;

  @ViewChild(NgxImageZoomComponent, {static: false}) zoomComponent: any;

  public productMedia$: Observable<Array<IProductMedia>>;
  public videoPreviewIcon: IconDefinition = faPlayCircle;
  public selectedMediaIndex: number;
  public videoPlaceholder = ImagePlaceholder.IMAGE_NOT_FOUND;

  constructor(private store: Store<IAppState>) { }

  @HostListener('window:resize', [])
  public onResize(): void {
    if (this.zoomComponent) {
      const container = this.zoomComponent.zoomContainer.nativeElement;

      container.style.width = '100%';
      container.style.height = '100%';
  }}

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
