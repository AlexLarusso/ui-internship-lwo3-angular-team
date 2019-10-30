import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { ProductService } from 'src/app/shared/services';
import { IProductShortInfo } from 'src/app/interfaces';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-error-sample',
  templateUrl: './error-sample.html',
  styleUrls: ['./error-sample.scss']
})
export class ErrorSampleComponent implements OnInit, OnDestroy {

  public product: IProductShortInfo;
  public productSub: Subscription;
  public buttonTitle = 'Load next';

  private MOCK_ID = 'f2aac67c';
  private MOCK_NEXT_ID = 'wrongID';

  constructor(
    private productService: ProductService
  ) { }

  public ngOnInit(): void {
    this.productSub = this.productService.getProductById(this.MOCK_ID, ProductFormat.short).
      subscribe(product => this.product = product);
  }

  public ngOnDestroy(): void { }

  public loadNext(): void {
    this.productSub = this.productService.getProductById(this.MOCK_NEXT_ID, ProductFormat.short).
      subscribe(product => this.product = product);
  }
}
