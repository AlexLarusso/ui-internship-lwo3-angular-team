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
  pageComponents: IPageAnchor[];

  constructor(private scrollService: ScrollService) {}

  onItemSelect(anchor: IPageAnchor): void {    
    this.scrollService.moveTo(anchor);
  }

  ngOnInit() {
    setTimeout(_ => {
      this.pageComponents = this.scrollService.getPageAnchors();
      this.scrollService.activeAnchor
        .subscribe((anchor: IPageAnchor) =>
          this.activeElement = anchor);
    }, 0);
  }
}
