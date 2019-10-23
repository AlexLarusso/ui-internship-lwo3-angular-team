import {
  Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy
} from '@angular/core';

import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { Subscription } from 'rxjs';

import { ScrollAnchorDirective } from 'src/app/shared/directives';
import { ScrollService, ProductService } from 'src/app/shared/services';
import { ProductFormat } from 'src/app/app.enum';
import { IProductShortInfo } from 'src/app/interfaces';

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(ScrollAnchorDirective)
  private pageAnchors: QueryList<ScrollAnchorDirective>;

  public productList: Array<IProductShortInfo>;
  public getProductsSub: Subscription;

  constructor(
    private scrollService: ScrollService,
    private productService: ProductService
  ) { }

  public ngOnInit(): void {
    this.getProductsSub = this.productService.getProducts(ProductFormat.short)
      .subscribe(data => this.productList = data);
  }

  public ngAfterViewInit(): void {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference)
    );
  }

  public ngOnDestroy(): void { }
}
