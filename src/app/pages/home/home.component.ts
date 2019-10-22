import { Component, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';

import { ScrollService } from 'src/app/shared/services/scroll.service';
import { ScrollAnchorDirective } from 'src/app/shared/directives/scroll-anchor.directive';
import { IProductShortInfo } from 'src/app/interfaces/product-short-info.interface';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductFormat } from 'src/app/app.enum';

@AutoUnsubscribe()
@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChildren(ScrollAnchorDirective)
  private pageAnchors: QueryList<ScrollAnchorDirective>;

  public productList: Array<IProductShortInfo>;
  public getProductsSub: Subscription;

  constructor(private scrollService: ScrollService,
    private productService: ProductService) { }

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
