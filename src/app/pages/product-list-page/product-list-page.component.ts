import {
  Component, ViewChildren, QueryList, OnInit,AfterViewInit
} from '@angular/core';

import { ScrollService } from 'src/app/shared/services';
import { ScrollAnchorDirective } from 'src/app/shared/directives';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.html',
})
export class ProductListPageComponent implements OnInit, AfterViewInit {
  @ViewChildren(ScrollAnchorDirective)
  private pageAnchors: QueryList<ScrollAnchorDirective>;
  public currentPath: string;

  constructor(
    private scrollService: ScrollService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.currentPath = this.route.snapshot.url[0].path;
  }

  public ngAfterViewInit(): void {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference)
    );
  }
}
