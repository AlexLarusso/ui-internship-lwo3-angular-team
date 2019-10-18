import { Component, OnInit } from '@angular/core';
import { ScrollService, IPageAnchor } from '../../shared/services/scroll.service';
import { faChevronUp, IconDefinition, faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.html',
  styleUrls: ['./scroll.scss']
})
export class ScrollComponent implements OnInit {
  public pageComponents: IPageAnchor[] = [];
  public activeElement: number;
  public toHeaderIcon: IconDefinition = faChevronUp;
  public toFooterIcon: IconDefinition = faChevronDown;

  constructor(private scrollService: ScrollService) { }

  public onItemSelect(anchor: IPageAnchor): void {
    this.scrollService.moveTo(anchor);
  }

  public ngOnInit(): void {
    this.scrollService.anchors.subscribe((anchors: IPageAnchor[]) =>
      this.pageComponents = anchors);
    this.scrollService.activeAnchor.subscribe((index: number) =>
      this.activeElement = index);
  }
}
