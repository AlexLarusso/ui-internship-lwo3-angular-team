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
  selector: 'app-home-page',
  templateUrl: './home-page.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  public productList: Array<IProductShortInfo>;
  public getProductsSub: Subscription;
  public products$;
  constructor(private productService: ProductService) { }

  public ngOnInit(): void {
    this.products$ = this.productService.getProducts(ProductFormat.short);
  }

  public ngOnDestroy(): void { }
}
