import { Component, Input } from '@angular/core';
import { IProductShortInfo } from 'src/app/interfaces';

import { faEye, IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.html',
  styleUrls: ['./products-view.scss']
})
export class ProductsViewComponent {
  @Input() public products: Array<IProductShortInfo>;

  public productsViewCount: number = null;
  public viewsIcon: IconDefinition = faEye;
}
