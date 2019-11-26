import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-review',
  templateUrl: './product-review.html',
  styleUrls: ['./product-review.scss']
})
export class ProductReviewComponent {
  @Input() public productId: string;
}
