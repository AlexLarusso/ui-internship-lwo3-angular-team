import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

import { IProductDetails } from 'src/app/interfaces/product-details.interface';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductDetailsComponent implements OnInit {
  @Input() public productDetails: IProductDetails;

  public productDescription: {
    title: string;
    text: string;
  }[] = [];
  public currentCurrency = 'USD';

  public ngOnInit(): void {
    this.addDescriptionNote('Detail',
      this.productDetails.description.detail);
    this.addDescriptionNote('Style',
      this.productDetails.description.style);
    this.addDescriptionNote('Delivery',
      this.productDetails.description.delivery);
  }

  private addDescriptionNote(title: string, text: string): void {
    this.productDescription.push({ text, title });
  }
}
