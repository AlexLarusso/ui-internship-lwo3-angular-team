import { Component, Input } from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../product.service';
import { IProduct } from 'src/app/product';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  public faHeart = faHeart;
  public product: IProduct;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService
  ) {}

  @Input() public src = '../../../assets/server-data/images/image-not-found.png';
  @Input() public title = 'Product Title';
  @Input() public price = 0;

  getProduct(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }
}
