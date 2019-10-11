import { Component } from '@angular/core';
import { ScrollService, IPageAnchor } from '../scroll.service';
import { faChevronUp, IconDefinition, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss']
})
export class ScrollComponent {  
  activeElement: IPageAnchor;
  toHeaderIcon: IconDefinition = faChevronUp;
  toFooterIcon: IconDefinition = faChevronDown;
  pageComponents: IPageAnchor[] = [];

  constructor(private scrollService: ScrollService) {
    this.scrollService.activeAnchor
      .subscribe((anchor: IPageAnchor) => {
        this.activeElement = anchor
      });
    this.scrollService.pageAnchors
      .subscribe((anchor: IPageAnchor) =>
        this.pageComponents.push(anchor));
  }

  onItemSelect(anchor: IPageAnchor): void {  
    this.scrollService.moveTo(anchor);
  }

  ngAfterViewChecked(): void {
    this.scrollService.initScrollListening();
  }
}
