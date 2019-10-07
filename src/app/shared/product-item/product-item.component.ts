import { Component, OnInit, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  faHeart = faHeart;

  @Input() src = '../../../assets/server-data/images/image-not-found.png';
  @Input() title = 'Product Title';
  @Input() price = 0;

  constructor() {}

  ngOnInit() {
  }

}
