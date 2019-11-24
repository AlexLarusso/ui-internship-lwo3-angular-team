import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-feedback',
  templateUrl: './product-feedback.html',
  styleUrls: ['./product-feedback.scss']
})
export class ProductFeedbackComponent {
  @Input() public productId: string;
}
