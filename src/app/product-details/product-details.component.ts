import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  public id = Number(this.route.snapshot.paramMap.get('id'));

  constructor(private route: ActivatedRoute) { }
}