import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html'
})
export class ProductDetailsComponent {
  public id = Number(this.route.snapshot.paramMap.get('id')); // IT should be after controller
  // TODO: constructor -> public properties, private properties, public methods, private methods
  constructor(private route: ActivatedRoute) { }
}
