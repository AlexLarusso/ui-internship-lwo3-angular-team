import { Component, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { ScrollService } from './shared/services/scroll.service';
import { ScrollAnchorDirective } from './shared/directives/scroll-anchor.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.html'
})
export class AppComponent implements AfterViewInit  {
  @ViewChildren(ScrollAnchorDirective)
    private pageAnchors: QueryList<ScrollAnchorDirective>;

  constructor(private scrollService: ScrollService) { }

  public ngAfterViewInit(): void {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference));
  }
}
