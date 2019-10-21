import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.html'
})
export class ProductDetailsComponent {
  constructor(private route: ActivatedRoute) { }

  public profuctId = Number(this.route.snapshot.paramMap.get('id'));
}
