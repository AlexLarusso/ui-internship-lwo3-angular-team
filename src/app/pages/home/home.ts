import { Component, ViewChildren, QueryList } from '@angular/core';
import { ScrollService } from 'src/app/scroll.service';
import { ScrollAnchorDirective } from 'src/app/scroll-anchor.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
})
export class Home {
  @ViewChildren(ScrollAnchorDirective)
    private pageAnchors: QueryList<ScrollAnchorDirective>;
    
  constructor(private scrollService: ScrollService) {}

  ngAfterViewInit () {
    this.pageAnchors.forEach(el => 
      this.scrollService.addAnchor(el.elementReference)
    );
  }
}
