import {
  Component, ViewChildren, QueryList, AfterViewInit
} from '@angular/core';

import { ScrollService } from 'src/app/shared/services';
import { ScrollAnchorDirective } from 'src/app/shared/directives';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.html',
})
export class ProductListPageComponent implements AfterViewInit {
  @ViewChildren(ScrollAnchorDirective)
  private pageAnchors: QueryList<ScrollAnchorDirective>;

  constructor(private scrollService: ScrollService) { }

  public ngAfterViewInit(): void {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference)
    );
  }
}
