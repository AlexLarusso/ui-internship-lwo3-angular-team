import { Component } from '@angular/core';
import { ProductResolver } from '../../product.resolver';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.html',
  providers: [ProductResolver]
})
export class ProductDetailsPage {
}
