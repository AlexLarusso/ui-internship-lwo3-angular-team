import { Component, OnInit, Input } from '@angular/core';
import { IProductDetails } from 'src/app/interfaces/product-details.interface';
import { IProductOptions } from 'src/app/interfaces/product-options.interface';
import { IProductDescription } from 'src/app/interfaces/product-description.interface';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input() private productDetails: IProductDetails;

  public productOptions: IProductOptions;
  public productDescription: {title: string, text: string}[] = [];
  public currentCurrency = 'UAH';

  constructor() { } 

  ngOnInit() {
    if (this.productDetails) {
      this.productOptions = this.productDetails.options;
      for (const key in this.productDetails.description) {
        this.productDescription.push({
          title: key,
          text: this.productDetails.description[key]
        });
      }
    }

    console.log(this.productOptions);
    console.log(this.productDescription);
    
    
  }
}