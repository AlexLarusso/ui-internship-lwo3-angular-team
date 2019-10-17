import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ScrollService, IPageAnchor } from '../../shared/services/scroll.service';
import { faChevronUp, IconDefinition, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.html',
  styleUrls: ['./scroll.scss']
})
export class ScrollComponent implements OnInit, AfterViewChecked {
  public pageComponents: IPageAnchor[] = [];

  private activeElement: IPageAnchor; // TODO: You use it in html, should be public. Check everywhere
  private toHeaderIcon: IconDefinition = faChevronUp;
  private toFooterIcon: IconDefinition = faChevronDown;

  constructor(private scrollService: ScrollService) { }

  public onItemSelect(anchor: IPageAnchor): void {
    this.scrollService.moveTo(anchor);
  }

  public ngOnInit(): void {
    this.scrollService.activeAnchor
      .subscribe((anchor: IPageAnchor) => {
        this.activeElement = anchor;
      });
    this.scrollService.pageAnchors
      .subscribe((anchor: IPageAnchor) =>
        this.pageComponents.push(anchor));
  }

  public ngAfterViewChecked(): void {
    this.scrollService.initScrollListening();
  }
}
