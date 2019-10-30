import {
  Component, OnInit, OnDestroy
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { IProductShortInfo } from 'src/app/interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public productList: Array<IProductShortInfo>;
  public getProductsSub: Subscription;

  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.getProductsSub = this.productService.getProducts(ProductFormat.short)
      .subscribe(data => this.productList = data);
  }

  public ngOnDestroy(): void { }
}
