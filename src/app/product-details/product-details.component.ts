import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProductShortInfoService } from '../product-short-info.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  constructor(private productService: ProductService, private shortInfoService: ProductShortInfoService,
     private route: ActivatedRoute) { }

  ngOnInit() {
    this.productService.getProduct(Number(this.route.snapshot.paramMap.get('id')))
    .subscribe(data =>
      this.shortInfoService.similarOptions = {
      sex : data.sex,
      category: data.category
    });
  }
}
