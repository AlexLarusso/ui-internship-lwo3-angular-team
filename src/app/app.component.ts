import { Component, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { ScrollService } from './scroll.service';
import { ScrollAnchorDirective } from './scroll-anchor.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit  {
  @ViewChildren(ScrollAnchorDirective)
    private pageAnchors: QueryList<ScrollAnchorDirective>;
 
  constructor(private scrollService: ScrollService) { }

  ngAfterViewInit () {
    this.pageAnchors.forEach(el =>
      this.scrollService.addAnchor(el.elementReference));
  }
}
