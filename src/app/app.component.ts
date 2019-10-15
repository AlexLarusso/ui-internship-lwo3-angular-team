import { Component, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { ScrollService } from './scroll.service';
import { ScrollAnchorDirective } from './scroll-anchor.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // TODO: delete component from file name
  styleUrls: ['./app.component.scss'] // TODO: delete component from file name
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
