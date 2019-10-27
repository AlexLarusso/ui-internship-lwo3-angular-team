import { Component, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ScrollService } from 'src/app/shared/services/scroll.service';
import { ScrollAnchorDirective } from 'src/app/shared/directives/scroll-anchor.directive';

@Component({
  selector: 'app-wish-list-page',
  templateUrl: './wish-list-page.html',
})
export class WishListPageComponent implements AfterViewInit {
  @ViewChildren(ScrollAnchorDirective)
  private pageAnchors: QueryList<ScrollAnchorDirective>;

  constructor(private scrollService: ScrollService) {}

  public ngAfterViewInit(): void {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference)
    );
  }
}
